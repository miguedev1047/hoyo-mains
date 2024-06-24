import { Card } from '@nextui-org/card'
import { IconAlertCircle } from '@tabler/icons-react'

export const PanelCharacterTeamError = () => {
  return (
    <div className='text-center'>
      <div className='flex items-center justify-center gap-2 text-color-red'>
        <IconAlertCircle size={32} className='animate-pulse' />
        <h2 className='text-base md:text-xl'>
          No se han podido cargar los personajes
        </h2>
      </div>
    </div>
  )
}

export const HomeCharacterList = () => {
  return (
    <div className='text-center'>
      <div className='flex items-center justify-center gap-2 text-color-red'>
        <IconAlertCircle size={32} className='animate-pulse' />
        <h2 className='text-base md:text-xl'>
          No se han podido cargar los personajes
        </h2>
      </div>
    </div>
  )
}

export const HomeCharacterTeamError = () => {
  return (
    <Card className='bg-color-red/20 aspect-square flex items-center justify-center text-color-red'>
      <IconAlertCircle size={32} className='animate-pulse' />
    </Card>
  )
}
