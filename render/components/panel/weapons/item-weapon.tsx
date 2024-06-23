import { Weapon } from '@prisma/client'
import { Button } from '@nextui-org/button'
import {
  Avatar,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image
} from '@nextui-org/react'
import { mutate } from 'swr'
import { useModalStore } from '@/utils/store/use-open'
import { Card, CardBody } from '@nextui-org/card'
import { IconPencil, IconSettings, IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { deleteImage } from '@/utils/helpers/delete-image'
import { deleteWeapon } from '@/render/services/panel/weapons/delete'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import { toast } from 'sonner'
import TooltipItemName from '@/render/components/UI/tooltip/tooltip-item-name'
import clsx from 'clsx'

const ItemWeapon = ({ weapon }: { weapon: Weapon }) => {
  const [isPending, starTransition] = useTransition()

  const { onOpen, setModalId } = useModalStore((state) => ({
    onOpen: state.onOpen,
    setModalId: state.setModalId
  }))

  const handleEdit = (weaponId: string) => {
    setModalId(weaponId)
    onOpen({ name: 'weapon' })
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
      <CardBody className='flex flex-row items-center justify-between'>
        <article className='flex items-center gap-4'>
          <figure className='w-10 h-10 bg-primary-color p-1 rounded-md flex-none relative'>
            {weapon.imageUrl ? (
              <Image
                radius='sm'
                className='w-full h-full object-cover'
                src={weapon.imageUrl!}
                alt={weapon.name}
              />
            ) : (
              <CircularProgress
                aria-label='Loading...'
                size='lg'
                classNames={{
                  svg: 'w-full h-full drop-shadow-md',
                  indicator: 'stroke-color-success',
                  track: 'stroke-white/10',
                  value: 'text-sm font-semibold text-white'
                }}
                strokeWidth={5}
              />
            )}
          </figure>
          <TooltipItemName item={weapon}>
            <h3 className='text-base font-semibold line-clamp-1'>
              {weapon.name}
            </h3>
          </TooltipItemName>
        </article>

        <Dropdown backdrop='opaque' className='bg-color-dark'>
          <DropdownTrigger>
            <Button
              isIconOnly
              size='sm'
              color='success'
              className='bg-color-light'
              isLoading={isPending}
            >
              <IconSettings />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='Weapon Actions'>
            <DropdownSection title='Acciones'>
              <DropdownItem
                key='edit'
                onPress={() => handleEdit(weapon.id)}
                startContent={<IconPencil />}
              >
                Editar
              </DropdownItem>
              <DropdownItem
                key='delete'
                onPress={() => handleDelete(weapon.id)}
                startContent={<IconTrash />}
                color='danger'
                className='text-color-red'
              >
                Eliminar
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

export default ItemWeapon
