import CardBody from '@lyra/ui/components/Card/CardBody'
import Modal from '@lyra/ui/components/Modal'
import React, { useState } from 'react'

import { ZERO_BN } from '@/app/constants/bn'

import RewardsWethLyraL2UnstakeModalContent from './RewardsWethLyraL2UnstakeModalContent'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function RewardsWethLyraL2UnstakeModal({ isOpen, onClose }: Props) {
  const [amount, setAmount] = useState(ZERO_BN)
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Unstake L2 WETH/LYRA">
      <CardBody>
        <RewardsWethLyraL2UnstakeModalContent
          amount={amount}
          onChange={val => setAmount(val)}
          onUnstake={() => {
            onClose()
            setAmount(ZERO_BN)
          }}
        />
      </CardBody>
    </Modal>
  )
}