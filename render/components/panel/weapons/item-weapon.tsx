import { useOpen } from '@/utils/store/use-open'
import { Weapon } from '@prisma/client'
import { Image } from '@nextui-org/image'
import { Button } from '@nextui-org/button'
import { mutate } from 'swr'
import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { deleteImage } from '@/utils/helpers/delete-image'
import { deleteWeapon } from '@/render/services/panel/weapons/delete'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import clsx from 'clsx'

const ItemWeapon = ({ weapon }: { weapon: Weapon }) => {
  const [isPending, starTransition] = useTransition()

  const { onOpen, setId } = useOpen((state) => ({
    onOpen: state.onOpen,
    setId: state.setId
  }))

  const handleEdit = (weaponId: string) => {
    setId(weaponId)
    onOpen(true)
  }

  const handleDelete = (weaponId: string) => {
    starTransition(async () => {
      const { status, error } = await deleteImage({
        path: 'weapons',
        id: weaponId
      })

      // Si la imagen se elimino, eliminamos el arma
      if (status === 201) {
        // Eliminar el arma
        const { message, status, error } = await deleteWeapon(weaponId)

        if (status === 201) {
          toast.success(message)
          mutate('/api/weapons?')
          return
        }

        toast.error(error)
        return
      }

      toast.error(`${error} Intentalo de nuevo`)
    })
  }

  return (
    <Card
      className={clsx(
        'bg-color-dark border-2',
        getStarBorderColor(weapon.stars)
      )}
    >
      <CardHeader className='flex flex-row items-center gap-4'>
        <Image
          isBlurred
          width={240}
          height={240}
          classNames={{
            wrapper: 'w-12 h-12'
          }}
          className='object-cover'
          src={weapon.imageUrl!}
          alt={weapon.name}
        />
        <h3 className='text-base font-semibold line-clamp-1'>{weapon.name}</h3>
      </CardHeader>
      <CardFooter className='grid grid-cols-2 gap-2'>
        <Button
          size='sm'
          radius='sm'
          color='danger'
          isLoading={isPending}
          onPress={() => handleDelete(weapon.id)}
          className='bg-color-darkest font-bold'
          startContent={<IconTrash size={16} />}
        >
          Eliminar
        </Button>
        <Button
          size='sm'
          radius='sm'
          color='success'
          onPress={() => handleEdit(weapon.id)}
          className='font-bold bg-color-light'
          startContent={<IconPencil size={16} />}
        >
          Editar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ItemWeapon
