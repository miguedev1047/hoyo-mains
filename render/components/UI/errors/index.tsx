import { IconAlertCircle } from '@tabler/icons-react'

const CharacterListError = () => {
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

export default CharacterListError
