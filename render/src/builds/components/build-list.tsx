import {
  NotFound,
  NotFoundTitle
} from '@/render/src/panel/shared/components/ui/no-items-found'
import { Character } from '@prisma/client'
import BuildItem from './build-item'

interface BuildListProps {
  builds: Character[]
}

const BuildList = ({ builds }: BuildListProps) => {
  if (!builds.length) {
    return (
      <NotFound>
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
