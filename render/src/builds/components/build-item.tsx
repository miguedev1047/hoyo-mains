'use client'

import { useViewStore } from '../utilities/store/use-view-store'
import { CharacterType } from '../../types'
import CardBuild from './cards/card-build/card-build'

interface BuildItemProps {
  build: CharacterType
}

const BuildItem = ({ build }: BuildItemProps) => {
  const { isOpen, cardId } = useViewStore((state) => ({
    isOpen: state.isOpen,
    cardId: state.cardId
  }))

  return (
    <>
      <CardBuild build={build} />
    </>
  )
}

export default BuildItem
