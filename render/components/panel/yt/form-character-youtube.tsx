import { z } from 'zod'
import { createvideoGuide } from '@/render/services/panel/yt/create'
import { updatevideoGuide } from '@/render/services/panel/yt/update'
import { CharacterYoutubeSchema } from '@/schemas'
import { Characters } from '@/types'
import { InputWrapper } from '@/utils/classes'
import { useOpen } from '@/utils/store/use-open'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip
} from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { mutate } from 'swr'

const FormCharacterYoutube = ({
  character
}: {
  character: Characters | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  const videoGuide = character?.videoGuide
  const isActiveEdit = !!videoGuide?.id

  const {
    handleSubmit,
    reset,
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
        const { status, message, error } = await updatevideoGuide(
          data,
          videoGuideId
        )

        if (status === 201) {
          mutate(`/api/characters/character/${character?.id}`)
          toast.success(message)
          setIsOpen(false)
          return
        }

        toast.error(error)
        return
      }

      const { status, message, error } = await createvideoGuide(
        data,
        characterId
      )

      if (status === 201) {
        mutate(`/api/characters/character/${character?.id}`)
        toast.success(message)
        setIsOpen(false)
        return
      }

      toast.error(error)
    })
  })

  return (
    <Popover
      isOpen={isOpen}
      backdrop='opaque'
      onOpenChange={(open) => setIsOpen(open)}
      placement='bottom'
    >
      <PopoverTrigger>
        <Button
          fullWidth
          size='lg'
          color='success'
          startContent={<IconPlus size={24} />}
          className='bg-color-light font-bold'
        >
          {videoGuide?.youtuberName ? 'Editar' : 'Añadir'} Video Guía
        </Button>
      </PopoverTrigger>
      <PopoverContent className='max-w-full w-[1024px] bg-color-dark rounded-lg p-4'>
        <form onSubmit={onSubmit} className='w-full space-y-2'>
          <h3 className='text-2xl font-semibold text-secondary-color mb-4'>
            {character?.name} Video Guía
          </h3>
          <div className='grid grid-cols-1 gap-2'>
            <Controller
              name='youtuberName'
              control={control}
              render={({ field }) => (
                <Input
                  autoFocus
                  isDisabled={isPending}
                  label='Nombre del youtuber'
                  placeholder='taNNa'
                  classNames={InputWrapper}
                  isInvalid={!!errors.youtuberName}
                  errorMessage={errors.youtuberName?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name='youtuberChannel'
              control={control}
              render={({ field }) => (
                <Input
                  isDisabled={isPending}
                  label='URL del canal'
                  placeholder='https://www.youtube.com/...'
                  classNames={InputWrapper}
                  isInvalid={!!errors.youtuberChannel}
                  errorMessage={errors.youtuberChannel?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name='embedVideoUrl'
              control={control}
              render={({ field }) => (
                <Input
                  isDisabled={isPending}
                  label='URL embed del video'
                  placeholder='https://www.youtube.com/embed/...'
                  classNames={InputWrapper}
                  isInvalid={!!errors.embedVideoUrl}
                  errorMessage={errors.embedVideoUrl?.message}
                  {...field}
                />
              )}
            />

            <Button
              size='lg'
              fullWidth
              isDisabled={isPending}
              isLoading={isPending}
              type='submit'
              color='success'
              className='bg-color-light font-bold'
            >
              {isActiveEdit ? 'Editar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default FormCharacterYoutube
