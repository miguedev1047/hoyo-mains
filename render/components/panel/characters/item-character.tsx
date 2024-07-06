import { Card } from '@nextui-org/card'
import { CircularProgress } from '@nextui-org/react'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import { Tooltip } from '@nextui-org/tooltip'
import { Character } from '@prisma/client'
import { Button } from '@nextui-org/button'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { deleteImage } from '@/utils/helpers/delete-image'
import { deleteCharacter } from '@/render/services/panel/characters/delete'
import { toast } from 'sonner'
import { mutate } from 'swr'
import { Image } from '@nextui-org/image'
import Link from 'next/link'
import clsx from 'clsx'

interface Props {
  character: Character
}

const ItemCharacter = ({ character }: Props) => {
  const [isPending, startTransition] = useTransition()

  const characterName = character.name.toLowerCase().replace(/\s/g, '-')
  const url = `/panel/character?name=${characterName}`

  const handleDelete = async (characterId: string) => {
    startTransition(async () => {
      const { status, message, error } = await deleteCharacter(characterId)

      if (status === 201) {
        toast.success(message)

        await deleteImage({
          path: 'characters',
          id: characterId
        })

        mutate('/api/characters')
        return
      }

      toast.error(error)
    })
  }

  return (
    <Tooltip
      className='bg-color-light text-color-darkest px-8'
      placement='bottom'
      content={<p className='font-medium capitalize'>{character.name}</p>}
    >
      <Card
        as={Link}
        href={url}
        isPressable
        isDisabled={isPending}
        className={clsx(
          'bg-color-dark border-2 p-0 aspect-square',
          getStarBorderColor(character.stars)
        )}
      >
        {character.imageUrl ? (
          <Image
            classNames={{
              wrapper: 'bg-color-darkest w-full h-full aspect-square'
            }}
            className='object-cover w-full h-full'
            src={character.imageUrl!}
            alt={character.name}
          />
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

        <Button
          fullWidth
          isIconOnly
          size='sm'
          radius='sm'
          color='danger'
          isLoading={isPending}
          onPress={() => handleDelete(character.id)}
          className='bg-color-red absolute right-0 bottom-0 z-10 m-2'
        >
          <IconTrash size={18} />
        </Button>
      </Card>
    </Tooltip>
  )
}

export default ItemCharacter
