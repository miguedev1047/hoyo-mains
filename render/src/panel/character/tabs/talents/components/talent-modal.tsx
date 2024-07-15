import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { IconPlus } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { InputWrapper } from '@/render/src/shared/utilities/classes'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { useCreateTalent } from '@/render/src/panel/character/tabs/talents/utilities/hooks/use-talent'
import { CharacterType } from '@/render/src/types'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'
import ModalButton from '@/render/src/panel/shared/components/buttons/modal-button'
import Editor from '@/render/src/shared/components/editor/editor'

interface TalentModalProps {
  character: CharacterType
}

const TalentModal = ({ character }: TalentModalProps) => {
  const talents = character?.talents
  
  const MAX_TALENTS = 3
  const TALENTS_LENGTH = talents?.length
  const MAX_ITEMS = TALENTS_LENGTH === MAX_TALENTS

  const {
    isPending,
    errors,
    control,
    isEditActive,
    modalName,
    onOpenModal,
    onOpenChange,
    onSubmit
  } = useCreateTalent({ character })

  return (
    <>
      {!MAX_ITEMS && (
        <Button
          fullWidth
          size='lg'
          type='submit'
          color='success'
          startContent={<IconPlus />}
          className=' bg-color-light font-bold'
          onPress={onOpenModal}
        >
          Añadir Talento
        </Button>
      )}
      <Modal
        size='4xl'
        isOpen={modalName}
        onOpenChange={onOpenChange}
        className='bg-color-dark'
      >
        <ModalContent>
          {() => (
            <form onSubmit={onSubmit}>
              <ModalHeader className='flex flex-col gap-1'>
                <h3 className='text-xl font-semibold capitalize text-secondary-color'>
                  {character?.name} - {isEditActive ? 'Editar' : 'Crear'}{' '}
                  Talento
                </h3>
              </ModalHeader>
              <ModalBody className='grid grid-cols-2'>
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
                      classNames={InputWrapper}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <Editor
                      isPending={isPending}
                      isEdit={isEditActive}
                      errorMessage={errors.description?.message}
                      placeholder='Descripción del talento'
                      description={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <ModalButton isLoading={isPending}>
                  {isEditActive ? 'Guardar' : 'Crear'}
                </ModalButton>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default TalentModal
