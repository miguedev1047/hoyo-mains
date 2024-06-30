import { Draggable } from '@hello-pangea/dnd'
import { Card, Image } from '@nextui-org/react'
import { IconGripVertical } from '@tabler/icons-react'
import { Characters, CharactersByTeam } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import { PanelSkeletonTeamCharacters } from '@/render/components/UI/skeletons'
import { PanelErrorItem } from '@/render/components/UI/errors'
import ButtonDeleteCharacter from '@/render/components/UI/buttons/team/button-delete-character'
import Figure from '@/render/components/UI/misc/figure'
import useSWR from 'swr'

const CharacterItemCharacter = ({
  team,
  character,
  index
}: {
  team: CharactersByTeam
  character: Characters | undefined
  index: number
}) => {
  const {
    data: dataCharacter,
    isLoading,
    error
  } = useSWR<Characters>(
    `/api/characters/character/${team.characterItem}`,
    fetcher
  )

  if (error) return <PanelErrorItem />
  if (isLoading) return <PanelSkeletonTeamCharacters />

  return (
    <Draggable draggableId={team.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='mb-4 lg:mx-2'
        >
          <Card className='flex flex-col gap-2 md:gap-4 p-2 md:p-5 bg-color-dark'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center select-none'>
                <span className='max-md:hidden'>
                  <IconGripVertical size={20} />
                </span>
                <Figure width='w-12' height='h-12' padding='p-0'>
                  <Image
                    radius='sm'
                    className='w-full h-full object-cover'
                    src={dataCharacter?.imageUrl!}
                    alt={dataCharacter?.name}
                  />
                </Figure>
                <h3 className='text-sm md:text-lg font-semibold capitalize line-clamp-1'>
                  {dataCharacter?.name}
                </h3>
              </div>

              <ButtonDeleteCharacter character={character} team={team!} />
            </div>
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default CharacterItemCharacter
