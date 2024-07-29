'use client'

import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/render/src/shared/components/sheet'
import { Button, Switch } from '@nextui-org/react'
import { CharacterType } from '@/render/src/types'
import { Controller } from 'react-hook-form'
import useConfiguration from '@/render/src/panel/character/configuration/utilities/hooks/use-configuration'

interface ConfigurationProps {
  character: CharacterType
}

const ConfigurationSheet = ({ character }: ConfigurationProps) => {
  const { isOpen, control, isPending, onOpen, onOpenChange, onSubmit } =
    useConfiguration({ character })

  return (
    <Sheet>
      <SheetTrigger fullWidth isDisabled={isPending} onPress={onOpen}>
        Configuración del personaje
      </SheetTrigger>
      <SheetContent
        className='bg-color-dark w-[400px] sm:w-[640px]'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <form onSubmit={onSubmit} className='w-full space-y-4'>
          <SheetHeader>
            <SheetTitle>Configuraciones de {character?.name}</SheetTitle>
            <SheetDescription>
              Configura las opciones de visibilidad de este personaje
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
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
          </SheetBody>
          <SheetFooter>
            <Button
              radius='sm'
              size='lg'
              type='submit'
              color='success'
              isLoading={isPending}
              className='bg-color-light font-bold'
            >
              Guardar
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default ConfigurationSheet
