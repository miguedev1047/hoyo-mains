import { z } from 'zod'
import { CharacterType } from '@/render/src/types'
import { createVideo } from '@/render/src/panel/character/video/services/create'
import { updateVideo } from '@/render/src/panel/character/video/services/update'
import { zodResolver } from '@hookform/resolvers/zod'
import { CharacterYoutubeSchema } from '@/schemas'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface VideoProps {
  character: CharacterType
}

export const useVideo = ({ character }: VideoProps) => {
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const videoGuide = character?.videoGuide
  const isActiveEdit = !!videoGuide?.id

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterYoutubeSchema>>({
    resolver: zodResolver(CharacterYoutubeSchema),
    defaultValues: {
      youtuberName: videoGuide?.youtuberName ?? '',
      embedVideoUrl: videoGuide?.embedVideoUrl ?? '',
      youtuberChannel: videoGuide?.youtuberChannel ?? ''
    }
  })

  const onSubmit = handleSubmit((data) => {
    const characterId = character?.id!

    startTransition(async () => {
      if (isActiveEdit) {
        const videoGuideId = videoGuide.id
        const { status, message, error } = await updateVideo(data, videoGuideId)

        if (status === 201) {
          toast.success(message)
          refresh()
          setIsOpen(false)
          return
        }

        toast.error(error)
        return
      }

      const { status, message, error } = await createVideo(data, characterId)

      if (status === 201) {
        toast.success(message)
        refresh()
        setIsOpen(false)
        return
      }

      toast.error(error)
    })
  })

  return {
    isOpen,
    isPending,
    control,
    errors,
    videoGuide,
    isActiveEdit,
    setIsOpen,
    onSubmit
  }
}
