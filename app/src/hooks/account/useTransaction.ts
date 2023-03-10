import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import { IconType } from '@lyra/ui/components/Icon'
import { closeToast, createPendingToast, updatePendingToast, updateToast } from '@lyra/ui/components/Toast'
import { ContractReceipt, PopulatedTransaction } from 'ethers'
import { useCallback } from 'react'

import { AppNetwork, Network } from '@/app/constants/networks'
import { TransactionType } from '@/app/constants/screen'
import { getChainIdForNetwork } from '@/app/utils/getChainIdForNetwork'
import getExplorerUrl from '@/app/utils/getExplorerUrl'
import getProvider from '@/app/utils/getProvider'
import logError from '@/app/utils/logError'
import postTransactionError from '@/app/utils/postTransactionError'
import postTransactionSuccess from '@/app/utils/postTransactionSuccess'
import resolveNetwork from '@/app/utils/resolveNetwork'

import useWallet from './useWallet'

const DEFAULT_TOAST_TIMEOUT = 1000 * 5 // 5 seconds
const POLL_INTERVAL = 1000 // 1 second

// https://docs.ethers.io/v5/single-page/#/v5/api/providers/types/-%23-providers-TransactionReceipt
enum TransactionStatus {
  Failure = 0,
  Success = 1,
}

export enum TransactionFailureStage {
  App = 'App',
  Wallet = 'Wallet',
  Reverted = 'Reverted',
}

type TransactionMetadata = Record<string, string | number | boolean>

export type TransactionSuccessOptions = {
  chain: number
  network: Network
  toastId: string
  txName: TransactionType
  signer: string
  metadata?: TransactionMetadata
  txHash: string
}

export type TransactionErrorOptions = {
  error: any
  network: Network
  chain: number
  stage: TransactionFailureStage
  toastId: string
  txName: TransactionType
  signer: string
  metadata?: TransactionMetadata
  txHash?: string | null
}

export type Transaction =
  | PopulatedTransaction
  | {
      tx: PopulatedTransaction
      metadata?: TransactionMetadata
    }

export type TransactionOptions = {
  onComplete?: (receipt: ContractReceipt) => any | Promise<any>
  metadata?: Record<string, string | number | boolean>
}

// Add custom error messages as they appear
export const parseTransactionErrorMessage = (error: any) => {
  const errorMessage = String(error?.errorName ?? error?.data?.error?.message ?? error?.message).split('[')[0]
  switch (errorMessage) {
    case 'TotalCostOutsideOfSpecifiedBounds':
      return 'Slippage out of bounds'
    default:
      return errorMessage
  }
}

const reportError = (options: TransactionErrorOptions) => {
  const { network, error, toastId, txHash } = options

  if (error?.code === 4001 || JSON.stringify(error).includes('user rejected transaction')) {
    // User rejected the transaction, skip report
    closeToast(toastId)
    return null
  }

  console.error(error)

  // Attempt to extract errorName to parse message
  const message = parseTransactionErrorMessage(error)

  // Log error to Sentry
  logError('TransactionFailed', options)

  // Post transaction error metadata to db
  postTransactionError(options)

  updateToast(toastId, {
    variant: 'error',
    description: message,
    icon: IconType.AlertTriangle,
    href: txHash ? getExplorerUrl(network, txHash) : undefined,
    target: '_blank',
    autoClose: false,
  })
}

const getTimeout = (network: Network): number => {
  switch (resolveNetwork(network)) {
    case AppNetwork.Arbitrum:
    case AppNetwork.Optimism:
      return 10 * 1000
    case AppNetwork.Ethereum:
      return 60 * 1000
  }
}

export default function useTransaction(
  network: Network
): (
  tx: Transaction | Promise<Transaction>,
  txName: TransactionType,
  options?: TransactionOptions
) => Promise<ContractReceipt | null> {
  const { account, signer } = useWallet()

  return useCallback(
    async (
      _tx: Transaction | Promise<Transaction>,
      txName: TransactionType,
      options?: TransactionOptions
    ): Promise<ContractReceipt | null> => {
      const provider = getProvider(network)

      if (!signer || !account) {
        console.warn('No signer')
        return null
      }

      const toastId = createPendingToast({
        description: 'Confirm your transaction',
        autoClose: false,
      })

      const successOrErrorOptions = {
        network,
        chain: getChainIdForNetwork(network),
        toastId,
        txName,
        metadata: options?.metadata,
        signer: account,
      }

      let tx: PopulatedTransaction
      try {
        const resolvedTx = await _tx
        if ('tx' in resolvedTx) {
          tx = resolvedTx['tx']
          successOrErrorOptions.metadata = { ...successOrErrorOptions.metadata, ...resolvedTx['metadata'] }
        } else {
          tx = resolvedTx
        }
      } catch (error) {
        reportError({ ...successOrErrorOptions, error, stage: TransactionFailureStage.App })
        return null
      }

      let response: TransactionResponse
      try {
        console.time('tx')
        console.debug('tx', tx)
        response = await signer.sendTransaction(tx)
        console.timeEnd('tx')
      } catch (error) {
        console.timeEnd('tx')
        reportError({ ...successOrErrorOptions, error, stage: TransactionFailureStage.Wallet })
        return null
      }

      const transactionTimeout = getTimeout(network)
      const autoClose = transactionTimeout + POLL_INTERVAL // add buffer
      const txHref = getExplorerUrl(network, response.hash)

      updatePendingToast(toastId, {
        description: `Your transaction is pending, click to view on etherscan`,
        href: txHref,
        target: '_blank',
        autoClose,
      })

      console.debug('response', response)
      console.time('waitForTransaction')
      // Poll for transaction receipt (can lead to faster results than .wait())
      const receipt = await new Promise<TransactionReceipt | null>(resolve => {
        let n = 0
        const pollReceipt = async () => {
          const receipt = await provider.getTransactionReceipt(response.hash)
          if (receipt) {
            resolve(receipt)
          } else if (n < 100) {
            n++
            setTimeout(pollReceipt, 500)
          } else {
            console.warn('Max retries exceeded')
            resolve(null)
          }
        }
        setTimeout(pollReceipt, 500)
      })
      console.debug('receipt', receipt)
      console.timeEnd('waitForTransaction')

      if (receipt) {
        if (receipt.status === TransactionStatus.Failure) {
          try {
            const transaction = await provider.getTransaction(response.hash)
            await provider.call(transaction as any, response.blockNumber)
          } catch (error) {
            reportError({
              ...successOrErrorOptions,
              error,
              stage: TransactionFailureStage.Reverted,
              txHash: receipt?.transactionHash,
            })
          }
          return null
        } else {
          // Transaction was polled successfully
          if (options?.onComplete != null) {
            // Execute middleware mutation for successful transactions
            console.time('onComplete')
            await options.onComplete(receipt)
            console.timeEnd('onComplete')
          }

          postTransactionSuccess({ ...successOrErrorOptions, txHash: receipt.transactionHash })

          updateToast(toastId, {
            variant: 'success',
            description: `Your transaction was successful`,
            href: txHref,
            target: '_blank',
            autoClose: DEFAULT_TOAST_TIMEOUT,
            icon: IconType.Check,
          })
          return receipt
        }
      } else {
        // Transaction timed out
        updateToast(toastId, {
          variant: 'warning',
          description: `Your transaction took longer than ${Math.floor(
            transactionTimeout / 1000
          )} seconds, click to view on etherscan`,
          href: txHref,
          target: '_blank',
          autoClose: DEFAULT_TOAST_TIMEOUT,
          icon: IconType.AlertTriangle,
        })
        return null
      }
    },
    [network, signer, account]
  )
}
