'use client'

import { CharacterType } from '@/render/src/types'
import ConfigurationPopover from '@/render/src/panel/character/components/configuration/configuration-popover'

interface ConfigurationProps {
  character: CharacterType
}

const Configuration = ({ character }: ConfigurationProps) => {
  return (
    <div className='w-full col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold text-secondary-color'>
        Configuraciones
      </h3>
      <ConfigurationPopover character={character} />
    </div>
  )
}

export default Configuration
