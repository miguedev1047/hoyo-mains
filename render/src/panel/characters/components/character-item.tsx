import { IconTrash } from '@tabler/icons-react'
import { getStarBorderColor } from '@/render/src/shared/utilities/helpers/get-border-color'
import { CharacterType } from '@/render/src/types'
import { generateCharacterUrl } from '@/render/src/shared/utilities/helpers/generate-character-url'
import { CircularProgress, Image, Tooltip } from '@nextui-org/react'
import { Card } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import { deleteCharacter } from '@/render/src/panel/characters/utilities/services/delete'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'
import Figure from '@/render/src/shared/components/ui/figure'
import clsx from 'clsx'

interface CharacterListProps {
  item: CharacterType
}

const CharacterItem = ({ item }: CharacterListProps) => {
  const characterUrl = generateCharacterUrl(item)
  const borderColor = getStarBorderColor(item.stars)

  return (
    <Tooltip
      className='bg-color-light text-color-darkest px-8'
      placement='bottom'
      content={<p className='font-medium capitalize'>{item.name}</p>}
    >
      <Card
        as={Link}
        href={characterUrl}
        isPressable
        className={clsx(
          'bg-color-dark border-2 p-0 aspect-square',
          borderColor
        )}
      >
        {item.imageUrl ? (
          <Figure width='w-full' height='w-full' background='bg-darkest'>
            <Image
              isZoomed
              className='object-cover w-full h-full'
              src={item.imageUrl!}
              alt={item.name}
            />
          </Figure>
        ) : (
          <CircularProgress
            aria-label='Loading...'
            className='absolute top-0 left-[50%] translate-x-[-50%] size-full'
            size='lg'
            classNames={{
              svg: 'w-36 h-36 drop-shadow-md',
              indicator: 'stroke-color-success',
              track: 'stroke-white/10',
              value: 'text-sm font-semibold text-white'
            }}
            strokeWidth={5}
          />
        )}

        <DeleteButton
          id={item.id}
          onCallback={deleteCharacter}
          className='bg-color-red absolute right-0 bottom-0 z-10 m-2'
          deleteType='image'
          path='characters'
        >
          <IconTrash />
        </DeleteButton>
      </Card>
    </Tooltip>
  )
}

export default CharacterItem
