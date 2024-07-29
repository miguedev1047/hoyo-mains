import { z } from 'zod'
import { CharacterType } from '@/render/src/types'
import { updateCharacterConfig } from '@/render/src/panel/character/configuration/utilities/services/update-character-config'
import { CharacterConfigurationSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useDisclosure } from '@nextui-org/react'

interface ConfigurationProps {
  character: CharacterType
}

const useConfiguration = ({ character }: ConfigurationProps) => {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const characterId = character?.id

  const { handleSubmit, control } = useForm<
    z.infer<typeof CharacterConfigurationSchema>
  >({
    resolver: zodResolver(CharacterConfigurationSchema),
    defaultValues: {
      public: character?.public,
      isNew: character?.isNew
    }
  })

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const { status, message, error } = await updateCharacterConfig(
        data,
        characterId
      )

      if (status === 201) {
        toast.success(message)
        onOpenChange()
        refresh()
        return
      }

      toast.error(error)
    })
  })

  return {
    isPending,
    isOpen,
    control,
    onOpen,
    onOpenChange,
    onSubmit
  }
}

export default useConfiguration
