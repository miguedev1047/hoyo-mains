import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/render/src/shared/components/sheet'
import { Input } from '@nextui-org/react'
import { InputWrapperDarkest } from '@/render/src/shared/utilities/classes'
import { CharacterType } from '@/render/src/types'
import { Button } from '@nextui-org/button'
import { Controller } from 'react-hook-form'
import { useCreateConstellation } from '@/render/src/panel/character/tabs/constellations/utilities/hooks/use-constellations'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'
import Editor from '@/render/src/shared/components/editor/editor'

interface ConstellationModalProps {
  character: CharacterType
}

const ConstellationSheet = ({ character }: ConstellationModalProps) => {
  const constellations = character?.constellations

  const CONSTELLATIONS_LIMIT = 6
  const CONSTELLATIONS_LENGTH = constellations?.length
  const MAX_CONSTELLATIONS_LIMIT = CONSTELLATIONS_LENGTH >= CONSTELLATIONS_LIMIT

  const {
    isPending,
    errors,
    control,
    isOpen,
    isEditActive,
    onOpen,
    onSubmit,
    onOpenChange
  } = useCreateConstellation({ character })

  return (
    <Sheet>
      <SheetTrigger
        fullWidth
        onPress={onOpen}
        isVisible={MAX_CONSTELLATIONS_LIMIT}
      >
        Añadir Constelación
      </SheetTrigger>
      <SheetContent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='bg-color-dark w-[400px] sm:w-[640px]'
      >
        <form onSubmit={onSubmit} className='space-y-4'>
          <SheetHeader>
            <SheetTitle>
              <span className='capitalize'>{character?.name}</span> -{' '}
              {isEditActive ? 'Editar' : 'Crear'} Constelación
            </SheetTitle>
          </SheetHeader>
          <SheetBody>
            <DropImage />

            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
                  autoFocus
                  label='Nombre de la constelación'
                  placeholder='Constelación 1'
                  isDisabled={isPending}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                  classNames={InputWrapperDarkest}
                  {...field}
                />
              )}
            />

            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <Editor
                  isEdit={isEditActive}
                  errorMessage={errors.description?.message}
                  placeholder='Descripción de la constelación'
                  description={field.value}
                  onChange={field.onChange}
                />
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
              {isEditActive ? 'Guardar' : 'Crear'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default ConstellationSheet
