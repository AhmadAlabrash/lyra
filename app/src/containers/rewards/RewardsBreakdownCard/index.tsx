import Card, { CardElement } from '@lyra/ui/components/Card'
import CardSeparator from '@lyra/ui/components/Card/CardSeparator'
import Flex from '@lyra/ui/components/Flex'
import useIsMobile from '@lyra/ui/hooks/useIsMobile'
import { MarginProps } from '@lyra/ui/types'
import { Network } from '@lyrafinance/lyra-js'
import React from 'react'

import useNetwork from '@/app/hooks/account/useNetwork'

import ClaimableRewardsCardSection from './ClaimableRewardsCardSection'
import PendingRewardsCardSection from './PendingRewardsCardSection'
import ShortCollateralRewardsCardSection from './ShortCollateralRewardsSection'
import TradingRewardsCardSection from './TradingRewardsCardSection'
import VaultsRewardsCardSection from './VaultsRewardsCardSection'
import WethLyraStakingRewardsCardSection from './WethLyraStakingRewardsCardSection'

type Props = MarginProps

const RewardsBreakdownCard = ({ ...marginProps }: Props): CardElement => {
  const isMobile = useIsMobile()
  const network = useNetwork()
  return (
    <Card flexDirection="column" {...marginProps}>
      <Flex flexDirection={isMobile ? 'column' : 'row'}>
        <ClaimableRewardsCardSection />
        <CardSeparator isHorizontal={isMobile} />
        <PendingRewardsCardSection />
      </Flex>
      <CardSeparator />
      <VaultsRewardsCardSection />
      <CardSeparator />
      <TradingRewardsCardSection />
      <CardSeparator />
      <ShortCollateralRewardsCardSection />
      <CardSeparator />
      {network === Network.Optimism ? <WethLyraStakingRewardsCardSection /> : null}
    </Card>
  )
}

export default RewardsBreakdownCard
