import { z } from 'zod'
import { updateCharacterConfig } from '@/render/services/panel/characters/update'
import { CharacterConfigurationSchema } from '@/schemas'
import { Characters } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { Switch } from '@nextui-org/switch'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { mutate } from 'swr'
import { IconSettings } from '@tabler/icons-react'

const Configuration = ({
  character
}: {
  character: Characters | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')
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
        mutate(`/api/characters/character?name=${characterName}`)
        toast.success(message)
        setIsOpen(false)
        return
      }

      toast.error(error)
    })
  })

  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold text-secondary-color'>
        Configuraciones
      </h3>
      <Popover
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        backdrop='opaque'
        placement='bottom'
      >
        <PopoverTrigger>
          <Button
            fullWidth
            size='lg'
            color='success'
            startContent={<IconSettings />}
            className='bg-color-light font-bold'
          >
            Configuración del personaje
          </Button>
        </PopoverTrigger>
        <PopoverContent className='bg-color-darkest p-4 max-w-full w-[640px]'>
          <div className='w-full space-y-4'>
            <h3 className='text-xl font-semibold text-secondary-color'>
              Configuración de{' '}
              <span className='capitalize'>{character?.name}</span>
            </h3>
            <form onSubmit={onSubmit} className='flex flex-col space-y-4'>
              <Controller
                control={control}
                name='public'
                render={({ field }) => (
                  <Switch
                    isDisabled={isPending}
                    isSelected={field.value}
                    onValueChange={field.onChange}
                  >
                    Visible para otros usuarios
                  </Switch>
                )}
              />

              <Controller
                control={control}
                name='isNew'
                render={({ field }) => (
                  <Switch
                    isDisabled={isPending}
                    isSelected={field.value}
                    onValueChange={field.onChange}
                  >
                    Marcar como nuevo personaje
                  </Switch>
                )}
              />

              <Button
                fullWidth
                size='lg'
                type='submit'
                color='success'
                isLoading={isPending}
                className='bg-color-light font-bold'
              >
                Guardar
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Configuration
