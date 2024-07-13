import { z } from 'zod'
import { CharacterType } from '@/render/src/types'
import { CharacterItemSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { createArtifact } from '../services/create'
import { toast } from 'sonner'

interface ArtifactSelectorProps {
  character: CharacterType
}

export const useArtifactSelector = ({ character }: ArtifactSelectorProps) => {
  const { refresh } = useRouter()

  const allArtifacts = character?.artifacts
  const disabledItems = allArtifacts?.map((item) => item.item)
  const MAX_ITEMS = 5

  const FULL_ITEMS = allArtifacts?.length === MAX_ITEMS

  const [isPending, startTransition] = useTransition()
  const [defaultKey, setKey] = useState<string>('default-key')

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
    const newArtifacts = data.items.split(',').map((item: string, index) => ({
      item: item,
      characterId: character?.id,
      order: index++
    }))

    const CURRENT_ITEMS = [...allArtifacts!, ...newArtifacts]
    if (CURRENT_ITEMS.length > MAX_ITEMS)
      return toast.error(`No puedes añadir más de ${MAX_ITEMS} materiales.`)

    startTransition(async () => {
      const { status, message, error } = await createArtifact(newArtifacts)

      if (status === 201) {
        reset()
        refresh()
        handleGenerateKey()
        toast.success(message)
        return
      }

      toast.error(error)
    })
  })

  return {
    FULL_ITEMS,
    defaultKey,
    disabledItems,
    errors,
    isPending,
    control,
    onSubmit
  }
}
