import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Controller } from 'react-hook-form'
import { InputWrapperDarkest } from '@/render/src/shared/utilities/classes'
import { useCreateTalent } from '@/render/src/panel/character/tabs/talents/utilities/hooks/use-talent'
import { CharacterType } from '@/render/src/types'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'
import Editor from '@/render/src/shared/components/editor/editor'
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/render/src/shared/components/sheet'

interface TalentModalProps {
  character: CharacterType
}

const TalentSheet = ({ character }: TalentModalProps) => {
  const talents = character?.talents

  const TALENT_LIMIT = 3
  const TALENTS_LENGTH = talents?.length
  const MAX_TALENTS_LIMIT = TALENTS_LENGTH === TALENT_LIMIT

  const {
    isPending,
    errors,
    control,
    isEditActive,
    isOpen,
    onOpen,
    onOpenChange,
    onSubmit
  } = useCreateTalent({ character })

  return (
    <Sheet>
      <SheetTrigger fullWidth onPress={onOpen} isVisible={MAX_TALENTS_LIMIT}>
        Añadir Talento
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
              {isEditActive ? 'Editar' : 'Crear'} Talento
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
                  label='Nombre del talento'
                  placeholder='Ataque Normal'
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
                  placeholder='Descripción del talento'
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

export default TalentSheet
