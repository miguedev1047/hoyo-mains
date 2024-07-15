import { z } from 'zod'
import { CharacterType } from '@/render/src/types'
import { CharacterAscensionSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createAscension } from '@/render/src/panel/character/ascension/utilities/services/create'

interface AscensionFormProps {
  character: CharacterType
}

export const useAscensionForm = ({ character }: AscensionFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const characterId = character?.id
  const ascension = character?.ascensions

  const MAX_ITEMS = 6
  const ASCENSION_LENGTH = ascension?.length
  const FULL_ITEMS = ASCENSION_LENGTH === MAX_ITEMS

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterAscensionSchema>>({
    resolver: zodResolver(CharacterAscensionSchema),
    defaultValues: {
      level: '',
      cost: '',
      materials: ''
    }
  })

  const onSubmit = handleSubmit((data) => {
    const ascensionId = crypto.randomUUID()

    const selectedMaterials = data.materials.split(',').map((materialId, index) => ({
      ascensionId: ascensionId,
      materialId: materialId,
      characterId: characterId,
      quantity: 0,
      order: index++
    }))

    const MAX_ITEMS = 4
    const MATERIALS_LENGTH = selectedMaterials?.length

    if (MATERIALS_LENGTH > MAX_ITEMS) {
      return toast.error(`Solo puedes agregar ${MAX_ITEMS} materiales.`)
    }

    if (MATERIALS_LENGTH < 3) {
      return toast.error(`Debes agregar ${MAX_ITEMS} materiales.`)
    }

    startTransition(async () => {
      const { status, message, error } = await createAscension(
        data,
        selectedMaterials,
        ascensionId,
        characterId
      )

      if (status === 201) {
        reset()
        refresh()
        setIsOpen(false)
        toast.success(message)
        return
      }

      toast.error(error)
    })
  })

  return {
    isPending,
    isOpen,
    control,
    errors,
    FULL_ITEMS,
    setIsOpen,
    onSubmit
  }
}
