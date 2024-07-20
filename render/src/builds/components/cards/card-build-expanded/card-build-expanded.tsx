import { CharacterType } from '@/render/src/types'
import React from 'react'
import CardContainer from '../card-container'
import CharacterImage from '../../character-image'
import Toggle from '../../toggle'
import WeaponList from './lists/weapon-list'
import ArtifactList from './lists/artifact-list'

interface CardBuildExpandedProps {
  build: CharacterType
}

const CardBuildExpanded = ({ build }: CardBuildExpandedProps) => {
  return (
    <CardContainer>
      <div className='flex justify-between items-start gap-4'>
        <CharacterImage build={build} />

        <div className='w-full max-w-[800px] flex items-center'>
          <div className='w-full grid grid-cols-2 gap-2'>
            <WeaponList build={build} />
            <ArtifactList build={build} />
          </div>

          <Toggle />
        </div>
      </div>
    </CardContainer>
  )
}

export default CardBuildExpanded
