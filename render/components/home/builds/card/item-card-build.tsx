'use client'

import { characterType } from '@/types'
import { useViewBuildStore } from '@/utils/store/use-view-build-store'
import { Card } from '@nextui-org/card'
import CardContent from '@/render/components/home/builds/card/card-content'
import clsx from 'clsx'

export const ItemCardComponent = ({
  character
}: {
  character: characterType | undefined
}) => {
  const { isOpen, cardId } = useViewBuildStore((state) => ({
    isOpen: state.isOpen,
    cardId: state.cardId
  }))

  const characterId = character?.id
  const checkSameCard = characterId === cardId

  const weapons = character?.weapons ?? []
  const artifacts = character?.artifacts ?? []

  return (
    <Card
      className={clsx(
        'bg-color-darkest p-4',
        isOpen && checkSameCard ? 'border-[1px] border-color-lightest' : ''
      )}
    >
      <CardContent
        character={character}
        weapons={weapons}
        artifacts={artifacts}
      />
    </Card>
  )
}
