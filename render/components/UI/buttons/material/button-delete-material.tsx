import { deleteCharacterMaterial } from '@/render/services/panel/materials/delete'
import { Characters, Data } from '@/types'
import { Button } from '@nextui-org/button'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const ButtonDeleteMaterial = ({
  material,
  character
}: {
  material: Data
  character: Characters | undefined
}) => {
  const [isPending, starTransition] = useTransition()
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')

  const handleDeleteMaterial = (materialId: string) => {
    starTransition(async () => {
      const { status, message, error } = await deleteCharacterMaterial(
        materialId
      )

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
      isIconOnly
      color='danger'
      isLoading={isPending}
      className='bg-color-red'
      onPress={() => handleDeleteMaterial(material.id)}
    >
      <IconTrash />
    </Button>
  )
}

export default ButtonDeleteMaterial
