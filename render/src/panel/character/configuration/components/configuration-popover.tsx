'use client'

import { CharacterType } from '@/render/src/types'
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Switch
} from '@nextui-org/react'
import { Controller } from 'react-hook-form'
import { IconSettings } from '@tabler/icons-react'
import useConfiguration from '@/render/src/panel/character/configuration/hooks/use-configuration'

interface ConfigurationProps {
  character: CharacterType
}

const ConfigurationPopover = ({ character }: ConfigurationProps) => {
  const { isOpen, control, isPending, handleOpen, onSubmit } = useConfiguration(
    { character }
  )

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={handleOpen}
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
      <PopoverContent className='bg-color-darkest p-4 w-[275px] xs:w-[375px] sm:w-[480px] md:w-[640px]'>
        <div className='w-full space-y-4'>
          <h3 className='text-base md:text-xl font-semibold text-secondary-color'>
            Configuraciones
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
                  <span className='max-md:text-xs'>
                    Visible para otros usuarios
                  </span>
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
                  <span className='max-md:text-xs'>
                    Marcar como nuevo personaje
                  </span>
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
  )
}

export default ConfigurationPopover
