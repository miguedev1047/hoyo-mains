import {
  NotFound,
  NotFoundTitle
} from '@/render/src/panel/shared/components/ui/no-items-found'
import { CharacterType } from '@/render/src/types'
import BuildItem from '@/render/src/builds/components/build-item'

interface BuildListProps {
  builds: CharacterType[]
}

const BuildList = ({ builds }: BuildListProps) => {
  if (!builds.length) {
    return (
      <NotFound className='h-40'>
        <NotFoundTitle>No se encontraron personajes</NotFoundTitle>
      </NotFound>
    )
  }

  return (
    <ol className='relative grid grid-cols-1 overflow-hidden gap-4 select-none'>
      {builds.map((build) => (
        <BuildItem key={build.id} build={build} />
      ))}
    </ol>
  )
}

export default BuildList
