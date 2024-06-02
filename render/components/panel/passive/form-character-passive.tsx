import { Characters } from '@/types'
import { InputWrapper } from '@/utils/classes'
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
import { useCreatePassive } from '@/utils/hooks/panel/use-create-passive'
import Editor from '@/render/components/UI/editor/editor'
import DropImage from '@/render/components/UI/drop-image'
import ModalButton from '@/render/components/UI/buttons/modal/modal-button'

const FormCharacterPassive = ({
  character
}: {
  character: Characters | undefined
}) => {
  const passives = character?.passives
  const MAX_PASSIVES = 3
  const TALENTS_LENGTH = passives?.length

  const {
    isPending,
    errors,
    control,
    modalName,
    isEditActive,
    onOpen,
    onSubmit,
    onOpenChange
  } = useCreatePassive(character)

  return (
    <>
      {(TALENTS_LENGTH ?? 0) !== MAX_PASSIVES && (
        <Button
          fullWidth
          size='lg'
          color='success'
          startContent={<IconPlus />}
          className=' bg-color-light font-bold'
          onPress={() => onOpen(true, 'passive-modal')}
        >
          Añadir Pasiva
        </Button>
      )}
      <Modal
        size='4xl'
        isOpen={modalName === 'passive-modal'}
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
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      className='col-span-2'
                      label='Nombre de la pasiva'
                      placeholder='Ascensión 1'
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
                      placeholder='Descripción de la pasiva'
                      description={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <DropImage />
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

export default FormCharacterPassive
