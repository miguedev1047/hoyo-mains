import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/render/src/shared/components/sheet'
import { Controller } from 'react-hook-form'
import { CharacterType } from '@/render/src/types'
import { useCreatePassive } from '@/render/src/panel/character/tabs/passives/utilities/hooks/use-passive'
import { InputWrapperDarkest } from '@/render/src/shared/utilities/classes'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'
import Editor from '@/render/src/shared/components/editor/editor'

interface PassiveModalProps {
  character: CharacterType
}

const PassiveModal = ({ character }: PassiveModalProps) => {
  const passives = character?.passives

  const PASSIVE_LIMIT = 3
  const TALENTS_LENGTH = passives?.length
  const MAX_PASSIVES_LIMIT = TALENTS_LENGTH >= PASSIVE_LIMIT

  const {
    isPending,
    errors,
    control,
    isEditActive,
    isOpen,
    onOpenModal,
    onOpenChange,
    onSubmit
  } = useCreatePassive({ character })

  return (
    <Sheet>
      <SheetTrigger
        fullWidth
        onPress={onOpenModal}
        isVisible={MAX_PASSIVES_LIMIT}
      >
        Añadir Pasiva
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
              {isEditActive ? 'Editar' : 'Crear'} Pasiva
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
                  className='col-span-2'
                  label='Nombre de la pasiva'
                  placeholder='Ascensión 1'
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
                  placeholder='Descripción de la pasiva'
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

export default PassiveModal
