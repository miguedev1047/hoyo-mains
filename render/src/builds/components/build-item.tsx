'use client'

import { useViewStore } from '@/render/src/builds/utilities/store/use-view-store'
import { CharacterType } from '@/render/src/types'
import CardBuild from '@/render/src/builds/components/cards/card-build/card-build'
import CardBuildExpanded from '@/render/src/builds/components/cards/card-build-expanded/card-build-expanded'

interface BuildItemProps {
  build: CharacterType
}

const BuildItem = ({ build }: BuildItemProps) => {
  const { isOpen, cardId } = useViewStore((state) => ({
    isOpen: state.isOpen,
    cardId: state.cardId
  }))

  const buildId = build.id
  const isExpanded = isOpen && cardId === buildId

  if (isExpanded) {
    return <CardBuildExpanded build={build} />
  }

  return <CardBuild build={build} />
}

export default BuildItem
