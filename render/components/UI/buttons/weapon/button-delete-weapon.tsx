import { deleteCharacterWeapon } from '@/render/services/panel/weapons/delete'
import { Characters, Data } from '@/types'
import { Button } from '@nextui-org/button'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const ButtonDeleteWeapon = ({
  weapon,
  character
}: {
  weapon: Data
  character: Characters | undefined
}) => {
  const [isPending, starTransition] = useTransition()
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')

  const handleDeleteMaterial = (weaponId: string) => {
    starTransition(async () => {
      const { status, message, error } = await deleteCharacterWeapon(weaponId)

      if (status === 201) {
        toast.success(message)
        mutate(`/api/characters/character?name=${characterName}`)
        return
      }

      toast.error(error)
    })
  }

  return (
    <Button
      color='danger'
      isLoading={isPending}
      isIconOnly
      onPress={() => handleDeleteMaterial(weapon.id)}
    >
      <IconTrash />
    </Button>
  )
}

export default ButtonDeleteWeapon
