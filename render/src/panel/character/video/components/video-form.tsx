'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { IconPlus } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { CharacterType } from '@/render/src/types'
import { useVideo } from '@/render/src/panel/character/video/utilities/hooks/use-video'
import { InputWrapper } from '@/render/src/shared/utilities/classes'

interface FormVideoProps {
  character: CharacterType
}

const FormVideo = ({ character }: FormVideoProps) => {
  const {
    videoGuide,
    isPending,
    isOpen,
    control,
    errors,
    isActiveEdit,
    onSubmit,
    setIsOpen
  } = useVideo({
    character
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
      <PopoverContent className='bg-color-dark rounded-lg p-4 w-[275px] xs:w-[375px] sm:w-[480px] md:w-[640px]'>
        <form onSubmit={onSubmit} className='w-full space-y-2'>
          <h3 className='text-lg md:text-2xl font-semibold capitalize text-secondary-color mb-4'>
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

export default FormVideo
