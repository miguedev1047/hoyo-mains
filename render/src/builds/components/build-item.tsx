'use client'

import { useViewStore } from '../utilities/store/use-view-store'
import { CharacterType } from '../../types'
import CardBuild from './cards/card-build/card-build'
import CardBuildExpanded from './cards/card-build-expanded/card-build-expanded'

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
      <CardBuildExpanded build={build} />
    </>
  )
}

export default BuildItem
