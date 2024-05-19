import { deleteCharacterMaterial } from '@/render/services/panel/materials/delete'
import { Data } from '@/types'
import { Button } from '@nextui-org/button'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const ButtonDeleteMaterial = ({ material }: { material: Data }) => {
  const [isPending, starTransition] = useTransition()

  const handleDeleteMaterial = (materialId: string) => {
    starTransition(async () => {
      const { status, message, error } = await deleteCharacterMaterial(
        materialId
      )

      if (status === 201) {
        toast.success(message)
        mutate(`/api/characters/character/${material.characterId}`)
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
      onPress={() => handleDeleteMaterial(material.id)}
    >
      <IconTrash />
    </Button>
  )
}

export default ButtonDeleteMaterial
