import { z } from 'zod'
import { CharacterType } from '@/render/src/types'
import { CharacterItemSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createMaterialCharacters } from '@/render/src/panel/character/materials/utilities/services/create'

interface MaterialSelectorProps {
  character: CharacterType
}

export const useMaterialSelector = ({ character }: MaterialSelectorProps) => {
  const { refresh } = useRouter()
  const [isPending, startTransition] = useTransition()
  const [defaultKey, setKey] = useState<string>('')

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterItemSchema>>({
    resolver: zodResolver(CharacterItemSchema),
    defaultValues: {
      items: ''
    }
  })

  const handleGenerateKey = () => {
    setKey(crypto.randomUUID())
  }

  const allMaterials = character?.materials
  const disabledItems = allMaterials?.map((item) => item.item)
  const MAX_ITEMS = 6

  const FULL_ITEMS = allMaterials?.length === MAX_ITEMS

  const onSubmit = handleSubmit((data) => {
    const selectedMaterials = data.items
      .split(',')
      .map((item: string, index) => ({
        item: item,
        characterId: character?.id,
        order: index++
      }))

    const CURRENT_ITEMS = [...allMaterials!, ...selectedMaterials]

    if (CURRENT_ITEMS.length > MAX_ITEMS)
      return toast.error(`No puedes añadir más de ${MAX_ITEMS} materiales.`)

    startTransition(async () => {
      const { status, message, error } = await createMaterialCharacters(
        selectedMaterials
      )

      if (status === 201) {
        reset()
        refresh()
        toast.success(message)
        handleGenerateKey()
        return
      }

      toast.error(error)
    })
  })

  return {
    control,
    errors,
    defaultKey,
    disabledItems,
    MAX_ITEMS,
    FULL_ITEMS,
    isPending,
    onSubmit
  }
}
