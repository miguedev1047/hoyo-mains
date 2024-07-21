import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/modal'
import { IconPlus } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { CharacterType } from '@/render/src/types'
import { useCreatePassive } from '@/render/src/panel/character/tabs/passives/utilities/hooks/use-passive'
import { InputWrapperDarkest } from '@/render/src/shared/utilities/classes'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'
import ModalButton from '@/render/src/panel/shared/components/buttons/modal-button'
import Editor from '@/render/src/shared/components/editor/editor'

interface PassiveModalProps {
  character: CharacterType
}

const PassiveModal = ({ character }: PassiveModalProps) => {
  const passives = character?.passives
  const MAX_PASSIVES = 3

  const TALENTS_LENGTH = passives?.length
  const MAX_ITEMS = TALENTS_LENGTH >= MAX_PASSIVES

  const {
    isPending,
    errors,
    control,
    isEditActive,
    modalName,
    onOpenModal,
    onOpenChange,
    onSubmit
  } = useCreatePassive({ character })

  return (
    <>
      {!MAX_ITEMS && (
        <Button
          fullWidth
          size='lg'
          color='success'
          startContent={<IconPlus />}
          className=' bg-color-light font-bold'
          onPress={onOpenModal}
        >
          Añadir Pasiva
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
                  {character?.name} - {isEditActive ? 'Editar' : 'Crear'} Pasiva
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
                      isPending={isPending}
                      isEdit={isEditActive}
                      errorMessage={errors.description?.message}
                      placeholder='Descripción de la pasiva'
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

export default PassiveModal
