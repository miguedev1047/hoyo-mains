import { useFetch } from '@/utils/hooks/general/use-fetch'
import { Draggable } from '@hello-pangea/dnd'
import { PanelErrorItem } from '@/render/components/UI/errors'
import { PanelSkeletonItem } from '@/render/components/UI/skeletons'
import { IconGripVertical, IconTrash } from '@tabler/icons-react'
import { Card } from '@nextui-org/card'
import { Button, Image } from '@nextui-org/react'
import Figure from '@/render/components/UI/misc/figure'
import { useTransition } from 'react'
import { deleteTeamCharacters } from '@/render/services/panel/teams/general-teams/delete'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
  characterId: string | null
  teamId: string | null
  order: number
  createdDate: Date
  updatedDate: Date
}

const CharacterItem = ({
  character,
  index
}: {
  character: Props
  index: number
}) => {
  const characterId = character?.characterId

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const { data, isLoading, error } = useFetch(
    `/api/characters/character/${characterId}`
  )

  if (isLoading) return <PanelSkeletonItem />
  if (error) return <PanelErrorItem />

  const handleDelete = (characterId: string) => {
    startTransition(async () => {
      const { status, message, error } = await deleteTeamCharacters(characterId)
      if (status === 201) {
        toast.success(message)
        refresh()
        return
      }

      toast.error(error)
    })
  }

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
              <Button
                size='sm'
                isIconOnly
                color='danger'
                className='bg-color-red'
                onPress={() => handleDelete(character.id)}
              >
                <IconTrash size={20} />
              </Button>
            </div>
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default CharacterItem
