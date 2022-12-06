import { BigNumber } from '@ethersproject/bignumber'
import Box from '@lyra/ui/components/Box'
import Button from '@lyra/ui/components/Button'
import ButtonShimmer from '@lyra/ui/components/Shimmer/ButtonShimmer'
import { MarginProps } from '@lyra/ui/types'
import { Market } from '@lyrafinance/lyra-js'
import React, { useCallback, useState } from 'react'

import { MAX_BN } from '@/app/constants/bn'
import { LogEvent } from '@/app/constants/logEvents'
import { TransactionType } from '@/app/constants/screen'
import OnboardingModal, { OnboardingModalStep } from '@/app/containers/common/OnboardingModal'
import withSuspense from '@/app/hooks/data/withSuspense'
import useAccount from '@/app/hooks/market/useAccount'
import { useMutateBalances } from '@/app/hooks/market/useBalances'
import useMarketBalances from '@/app/hooks/market/useMarketBalances'
import useTransaction from '@/app/hooks/transaction/useTransaction'
import { useMutateVaultBalance } from '@/app/hooks/vaults/useVaultBalance'
import logEvent from '@/app/utils/logEvent'

import TransactionButton from '../../common/TransactionButton'

type Props = {
  market: Market
  amount: BigNumber
} & MarginProps

const VaultsDepositFormButton = withSuspense(
  ({ market, amount, ...styleProps }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isApprovalLoading, setIsApprovalLoading] = useState(false)
    const marketBalances = useMarketBalances(market.address)
    const quoteAsset = marketBalances?.quoteAsset
    const account = useAccount()

    const mutateLiquidityDepositBalance = useMutateBalances()
    const mutateMyVaultLiquidity = useMutateVaultBalance()

    const execute = useTransaction()
    const handleClickApprove = useCallback(async () => {
      if (!account) {
        console.warn('Account does not exist')
        return null
      }
      setIsApprovalLoading(true)
      const tx = await account.approveDeposit(market.address, MAX_BN)
      await execute(tx, {
        onComplete: async () => await Promise.all([mutateLiquidityDepositBalance()]),
      })
      setIsApprovalLoading(false)
    }, [account, market, execute, mutateLiquidityDepositBalance])

    const handleClickDeposit = useCallback(async () => {
      if (!account || !market) {
        console.warn('Account does not exist')
        return null
      }
      setIsLoading(true)
      await execute(market.deposit(account.address, amount), {
        onComplete: async () =>
          await Promise.all([mutateLiquidityDepositBalance(), mutateMyVaultLiquidity(market.address)]),
      })
      setIsLoading(false)
    }, [account, amount, execute, market, mutateLiquidityDepositBalance, mutateMyVaultLiquidity])

    const insufficientBalance = quoteAsset?.balance.lt(amount) || quoteAsset?.balance.isZero()
    const insufficientAllowance = quoteAsset?.depositAllowance.lt(amount) || quoteAsset?.depositAllowance.isZero()

    const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false)

    const swapButton = (
      <>
        <TransactionButton
          transactionType={TransactionType.VaultDeposit}
          hideIfNotReady
          sx={{ mb: 3, width: '100%' }}
          variant="primary"
          size="lg"
          label={`Swap to ${quoteAsset?.symbol}`}
          onClick={() => {
            setIsOnboardingModalOpen(true)
            logEvent(LogEvent.OnboardingModalOpen)
          }}
        />
        <Button size="lg" width="100%" isDisabled label={'Deposit'} onClick={handleClickDeposit} />
      </>
    )

    const approveButton = (
      <>
        <TransactionButton
          transactionType={TransactionType.VaultDeposit}
          hideIfNotReady
          sx={{ mb: 3, width: '100%' }}
          variant="primary"
          size="lg"
          isLoading={isApprovalLoading}
          onClick={handleClickApprove}
          label={`Allow Lyra to use your ${market.quoteToken.symbol}`}
        />
        <Button size="lg" width="100%" isDisabled label={'Deposit'} onClick={handleClickDeposit} />
      </>
    )

    const depositButton = (
      <TransactionButton
        transactionType={TransactionType.VaultDeposit}
        sx={{ width: '100%' }}
        size="lg"
        variant="primary"
        isDisabled={insufficientAllowance || insufficientBalance || amount.lte(0)}
        isLoading={isLoading}
        label={amount.lte(0) ? 'Enter Amount' : insufficientBalance ? 'Insufficient Balance' : 'Deposit'}
        onClick={handleClickDeposit}
      />
    )

    return (
      <Box {...styleProps}>
        {insufficientBalance ? swapButton : insufficientAllowance ? approveButton : depositButton}
        <OnboardingModal
          isOpen={isOnboardingModalOpen}
          onClose={() => setIsOnboardingModalOpen(false)}
          defaultDestToken={quoteAsset?.address}
          step={OnboardingModalStep.GetTokens}
        />
      </Box>
    )
  },
  ({ ...styleProps }) => <ButtonShimmer size="lg" width="100%" {...styleProps} />
)
export default VaultsDepositFormButton
