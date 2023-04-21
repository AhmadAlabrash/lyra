import Box from '@lyra/ui/components/Box'
import Button from '@lyra/ui/components/Button'
import Card from '@lyra/ui/components/Card'
import CardSection from '@lyra/ui/components/Card/CardSection'
import CardSeparator from '@lyra/ui/components/Card/CardSeparator'
import Flex from '@lyra/ui/components/Flex'
import Grid from '@lyra/ui/components/Grid'
import { IconType } from '@lyra/ui/components/Icon'
import Text from '@lyra/ui/components/Text'
import Countdown from '@lyra/ui/components/Text/CountdownText'
import useIsMobile from '@lyra/ui/hooks/useIsMobile'
import { MarginProps } from '@lyra/ui/types'
import formatDate from '@lyra/ui/utils/formatDate'
import formatTruncatedUSD from '@lyra/ui/utils/formatTruncatedUSD'
import copy from 'copy-to-clipboard'
import React from 'react'
import { useState } from 'react'
import { useCallback } from 'react'

import LabelItem from '@/app/components/common/LabelItem'
import RewardTokenAmounts from '@/app/components/rewards/RewardTokenAmounts'
import useWallet from '@/app/hooks/account/useWallet'
import useIsReferralTermsAccepted from '@/app/hooks/referrals/useIsReferralTermsAccepted'
import { ReferralsPageData } from '@/app/hooks/referrals/useReferralsPageData'
import checkReferrerCode from '@/app/utils/referrals/checkReferrerCode'
import createReferrerCode from '@/app/utils/referrals/createReferrerCode'
import getReferralLink from '@/app/utils/referrals/getReferralLink'
import validateReferrerCode from '@/app/utils/referrals/validateReferrerCode'

import ConnectWalletButton from '../../common/ConnectWalletButton'
import ReferralsTermsOfUseModal from '../../common/ReferralsTermsOfUseModal'
import ReferralsInput from './ReferralsInput'

type Props = {
  data: ReferralsPageData
} & MarginProps

const ReferralsCreateCard = ({ data, ...marginProps }: Props) => {
  const {
    referrerCode: initReferrerCode,
    currentEpochReferredTradersCount,
    currentEpochReferredTradersRewards,
    currentEpochReferredTradersVolume,
    latestGlobalRewardEpoch,
  } = data
  const isMobile = useIsMobile()
  const { account, connectedAccount } = useWallet()
  const isOwnAccount = !!account && !!connectedAccount && account === connectedAccount
  const [isCreateMode, setIsCreateMode] = useState<boolean>(isOwnAccount && !initReferrerCode)
  const [referrerCode, setReferrerCode] = useState<string | null | undefined>(initReferrerCode)
  const [isInvalidCode, setIsInvalidCode] = useState<boolean>(false)
  const [isTakenCode, setIsTakenCode] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState(false)

  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isReferralTermsAccepted] = useIsReferralTermsAccepted()

  const onChangeReferralCode = useCallback(async (referrerCode: string) => {
    setReferrerCode(referrerCode)
    const isValid = validateReferrerCode(referrerCode)
    if (!isValid) {
      setIsInvalidCode(true)
    } else {
      setIsInvalidCode(false)
      setIsTakenCode(false)
      setReferrerCode(referrerCode)
    }
  }, [])

  const onClickCopy = useCallback((value: string) => {
    copy(value)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 600)
  }, [])

  const onClickCreate = useCallback(
    async (value: string) => {
      const isAvailable = await checkReferrerCode(value)
      if (!isAvailable) {
        setIsTakenCode(true)
      } else if (isOwnAccount) {
        const createCodeResult = await createReferrerCode(account, value)
        if (createCodeResult) {
          setReferrerCode(createCodeResult)
          setIsCreateMode(false)
        }
      }
    },
    [account, isOwnAccount]
  )

  return (
    <>
      <Card {...marginProps}>
        <CardSection>
          <Text variant="heading" color="text">
            {isCreateMode ? 'Create Code' : 'Code Created'}
          </Text>
          <Text color="errorText" variant="smallMedium" mb={2} height={20}>
            {isInvalidCode
              ? 'Only lowercase letters, numbers and underscores are allowed. Minimum 4 letters.'
              : isTakenCode
              ? 'Referrer code is taken.'
              : ''}
          </Text>
          <Flex>
            <Box width="50%">
              <ReferralsInput
                network={latestGlobalRewardEpoch.lyra.network}
                isCopied={isCopied}
                isCreateMode={isCreateMode}
                referrerCode={referrerCode}
                isInvalidCode={isInvalidCode}
                isTakenCode={isTakenCode}
                onClickCopy={onClickCopy}
                onChangeReferralCode={onChangeReferralCode}
                onClickCreate={value => {
                  if (isReferralTermsAccepted) {
                    onClickCreate(value)
                  } else {
                    setIsTermsOpen(true)
                  }
                }}
              />
            </Box>
            {!isCreateMode && referrerCode ? (
              <Button
                size="lg"
                ml={2}
                label="Tweet"
                rightIcon={IconType.Twitter}
                onClick={() => {
                  window.open(
                    encodeURI(
                      `http://twitter.com/intent/tweet?text=Start trading on Lyra with my referral code to get a 20% boost on your trading rewards ${getReferralLink(
                        referrerCode
                      )}`
                    ),
                    '_blank'
                  )
                }}
              />
            ) : null}
          </Flex>
        </CardSection>
        <CardSeparator isHorizontal />
        <CardSection flexDirection={isMobile ? 'column' : 'row'} noPadding>
          <CardSection isVertical sx={{ flexGrow: 1 }}>
            <Flex mb={8}>
              <Text variant="heading">Your Rewards</Text>
              <Text variant="heading" color="secondaryText">
                &nbsp; · &nbsp;{formatDate(latestGlobalRewardEpoch.startTimestamp, true)} -{' '}
                {formatDate(latestGlobalRewardEpoch.endTimestamp, true)}
              </Text>
            </Flex>
            {account ? (
              <>
                <Grid sx={{ gridTemplateColumns: ['1fr', '1fr 1fr 1fr 1fr'] }}>
                  <LabelItem textVariant="body" label="Referred traders" value={currentEpochReferredTradersCount} />
                  <LabelItem
                    textVariant="body"
                    label="Referred volume"
                    value={formatTruncatedUSD(currentEpochReferredTradersVolume)}
                    valueColor="text"
                  />
                  <LabelItem
                    textVariant="body"
                    label="Pending Rewards"
                    value={<RewardTokenAmounts tokenAmounts={currentEpochReferredTradersRewards} showDash={false} />}
                  />
                  <LabelItem
                    textVariant="body"
                    label="Ends In"
                    value={<Countdown timestamp={latestGlobalRewardEpoch.distributionTimestamp} />}
                    valueColor="text"
                  />
                </Grid>
              </>
            ) : (
              <Flex>
                <ConnectWalletButton width={150} size="lg" network={latestGlobalRewardEpoch.lyra.network} />
              </Flex>
            )}
          </CardSection>
        </CardSection>
      </Card>
      <ReferralsTermsOfUseModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  )
}
export default ReferralsCreateCard
