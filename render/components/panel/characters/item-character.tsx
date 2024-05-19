import { Card, CardFooter } from '@nextui-org/card'
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
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

interface Props {
  character: Character
}

const ItemCharacter = ({ character }: Props) => {
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
      <Card as={Link} href={url} isDisabled={isPending} className='bg-color-dark border-2'>
        <Image
          width={1024}
          height={1024}
          className='object-cover bg-color-darkest'
          src={character.imageUrl!}
          alt={character.name}
        />

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