import { Card } from '@nextui-org/card'
import { useFetch } from '@/utils/hooks/general/use-fetch'
import { Draggable } from '@hello-pangea/dnd'
import { PanelErrorItem } from '@/render/components/UI/errors'
import { PanelSkeletonItem } from '@/render/components/UI/skeletons'
import { IconGripVertical, IconTrash } from '@tabler/icons-react'
import { Image } from '@nextui-org/react'
import { deleteTeamCharacters } from '@/render/services/panel/teams/best-teams/delete'
import { DeleteButton } from '@/render/components/UI/buttons/delete/delete-button'
import Figure from '@/render/components/UI/misc/figure'

interface CharacterItemTypes {
  id: string
  characterId: string
  teamId: string | null
  order: number
  createdDate: Date
  updatedDate: Date
}

const CharacterItem = ({
  character,
  index
}: {
  character: CharacterItemTypes
  index: number
}) => {
  const characterId = character?.characterId

  const { data, isLoading, error } = useFetch(
    `/api/characters/character/${characterId}`
  )

  if (isLoading) return <PanelSkeletonItem />
  if (error) return <PanelErrorItem />

  return (
    <Draggable draggableId={character.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='lg:mx-2'
        >
          <Card className='bg-color-darkest p-5'>
            <div className='flex items-center justify-between gap-2'>
              <article className='flex items-center gap-4'>
                <IconGripVertical size={20} />
                <Figure padding='p-0'>
                  <Image src={data.imageUrl!} alt={data.name} />
                </Figure>
                <h2 className='capitalize line-clamp-1 text-base md:text-lg font-medium'>
                  {data.name}
                </h2>
              </article>
              <DeleteButton id={character.id} onCallback={deleteTeamCharacters}>
                <IconTrash size={20} />
              </DeleteButton>
            </div>
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default CharacterItem
