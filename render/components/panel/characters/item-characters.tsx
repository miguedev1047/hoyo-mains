import { Card, CardFooter } from '@nextui-org/card'
import { Tooltip } from '@nextui-org/tooltip'
import { Image } from '@nextui-org/image'
import { Character } from '@prisma/client'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { deleteImage } from '@/utils/helpers/delete-image'
import { toast } from 'sonner'
import { deleteCharacter } from '@/render/services/panel/characters/delete'
import { mutate } from 'swr'

interface Props {
  character: Character
}

const ItemCharacters = ({ character }: Props) => {
  const [isPending, startTransition] = useTransition()
  const url = '/panel/characters/character/' + character.id

  const handleDelete = async (characterId: string) => {
    startTransition(async () => {
      const { status, error } = await deleteImage({
        path: 'characters',
        id: characterId
      })

      // Si la imagen se elimino, eliminamos el personaje
      if (status === 201) {
        // Eliminar el personaje
        const { status, message, error } = await deleteCharacter(characterId)

        if (status === 201) {
          toast.success(message)
          mutate('/api/characters')
          return
        }

        toast.error(error)
      }

      toast.error(`${error} Intentalo de nuevo`)
    })
  }

  return (
    <Tooltip
      className='bg-color-light text-color-darkest px-8'
      placement='bottom'
      content={<p className='font-medium capitalize'>{character.name}</p>}
    >
      <Card
        isFooterBlurred
        as={Link}
        href={url}
        className='overflow-visible bg-color-dark'
      >
        <Image
          isBlurred
          isZoomed
          className='text-yellow-500'
          src={character.imageUrl!}
          alt={character.name}
          height={320}
          width={320}
        />

        <CardFooter className='before:bg-color-darkest/10 border-white/20 border-1 overflow-hidden py-1 px-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
          <Button
            fullWidth
            size='sm'
            isLoading={isPending}
            onPress={() => handleDelete(character.id)}
            startContent={<IconTrash size={16} />}
            className='bg-color-darkest'
          >
            Eliminar
          </Button>
        </CardFooter>
      </Card>
    </Tooltip>
  )
}

export default ItemCharacters
