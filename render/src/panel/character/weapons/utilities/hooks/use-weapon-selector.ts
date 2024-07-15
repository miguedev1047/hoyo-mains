import { z } from 'zod'
import { CharacterType } from '@/render/src/types'
import { CharacterItemSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { createWeapon } from '@/render/src/panel/character/weapons/utilities/services/create'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface WeaponSelectorProps {
  character: CharacterType
}
export const useWeaponSelector = ({ character }: WeaponSelectorProps) => {
  const [isPending, startTransition] = useTransition()
  const [defaultKey, setKey] = useState<string>('default-key')
  const { refresh } = useRouter()


  const allMaterials = character?.weapons
  const disabledItems = allMaterials?.map((item) => item.item)
  const MAX_ITEMS = 5

  const FULL_ITEMS = allMaterials?.length === MAX_ITEMS

  const handleGenerateKey = () => {
    setKey(crypto.randomUUID())
  }

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

  const onSubmit = handleSubmit((data) => {
    const selectedWeapons = data.items
      .split(',')
      .map((item: string, index) => ({
        item: item,
        characterId: character?.id,
        order: index++
      }))

    const CURRENT_ITEMS = [...allMaterials!, ...selectedWeapons]
    if (CURRENT_ITEMS.length > MAX_ITEMS)
      return toast.error(`No puedes añadir más de ${MAX_ITEMS} materiales.`)

    startTransition(async () => {
      const { status, message, error } = await createWeapon(selectedWeapons)

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
    defaultKey,
    disabledItems,
    errors,
    isPending,
    FULL_ITEMS,
    onSubmit
  }
}
