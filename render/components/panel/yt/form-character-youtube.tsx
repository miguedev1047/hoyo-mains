import { z } from 'zod'
import { createCharacterVideo } from '@/render/services/panel/yt/create'
import { updateCharacterVideo } from '@/render/services/panel/yt/update'
import { CharacterYoutubeSchema } from '@/schemas'
import { Characters } from '@/types'
import { InputWrapper } from '@/utils/classes'
import { useOpen } from '@/utils/store/use-open'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/modal'
import { Tooltip } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { mutate } from 'swr'

const FormCharacterYoutube = ({
  character
}: {
  character: Characters | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const { isOpen, onOpenChange, onOpen } = useOpen((state) => ({
    isOpen: state.open,
    onOpenChange: state.onOpenChange,
    onOpen: state.onOpen
  }))

  const characterVideo = character?.characterVideo
  const isActiveEdit = !!characterVideo?.id

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterYoutubeSchema>>({
    resolver: zodResolver(CharacterYoutubeSchema),
    defaultValues: {
      youtuberName: '',
      embedVideoUrl: '',
      youtuberChannel: ''
    }
  })

  useEffect(() => {
    if (isActiveEdit) {
      setValue('embedVideoUrl', characterVideo.embedVideoUrl)
      setValue('youtuberName', characterVideo.youtuberName)
      setValue('youtuberChannel', characterVideo.youtuberChannel)
    }
  }, [isActiveEdit, setValue, characterVideo])

  const onSubmit = handleSubmit((data) => {
    const characterId = character?.id!

    startTransition(async () => {
      if (isActiveEdit) {
        const characterVideoId = characterVideo.id
        const { status, message, error } = await updateCharacterVideo(
          data,
          characterVideoId
        )

        if (status === 201) {
          reset()
          toast.success(message)
          onOpen(false)
          mutate(`/api/characters/character/${character?.id}`)
          return
        }

        toast.error(error)
        return
      }

      const { status, message, error } = await createCharacterVideo(
        data,
        characterId
      )

      if (status === 201) {
        reset()
        onOpen(false)
        toast.success(message)
        mutate(`/api/characters/character/${character?.id}`)
        return
      }

      toast.error(error)
    })
  })

  return (
    <>
      <Tooltip
        className='bg-color-dark p-2'
        radius='md'
        content='Agregar video guia del personaje'
      >
        <Button
          isIconOnly
          className='bg-color-light text-color-darkest'
          onPress={() => onOpen(true)}
        >
          <IconPlus size={24} />
        </Button>
      </Tooltip>
      <Modal
        size='3xl'
        className='bg-color-dark'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <form onSubmit={onSubmit}>
              <ModalHeader className='flex flex-col gap-1'>
                <h3 className='text-2xl font-semibold text-secondary-color'>
                  {character?.name} Video Guía
                </h3>
              </ModalHeader>
              <ModalBody>
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
                      size='lg'
                      {...field}
                    />
                  )}
                />

                <Controller
                  name='youtuberChannel'
                  control={control}
                  render={({ field }) => (
                    <Input
                      size='lg'
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
                      size='lg'
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
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  isDisabled={isPending}
                  isLoading={isPending}
                  type='submit'
                  color='success'
                  className='bg-color-light font-bold'
                >
                  {isActiveEdit ? 'Editar' : 'Guardar'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default FormCharacterYoutube
