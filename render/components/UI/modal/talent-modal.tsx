import { Characters } from '@/types'
import { InputWrapper } from '@/utils/classes'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { IconPlus } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { useCreateTalent } from '@/utils/hooks/panel/use-create-talent'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import Editor from '@/render/components/UI/editor/editor'
import DropImage from '@/render/components/UI/drop-image'
import ModalButton from '@/render/components/UI/buttons/modal/modal-button'

const ModalTalent = ({ character }: { character: Characters | undefined }) => {
  const talents = character?.talents
  const MAX_TALENTS = 3
  const TALENTS_LENGTH = talents?.length

  const {
    isPending,
    errors,
    control,
    isEditActive,
    modalName,
    onOpenModal,
    onOpenChange,
    onSubmit
  } = useCreateTalent(character)

  return (
    <>
      {(TALENTS_LENGTH ?? 0) !== MAX_TALENTS && (
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

export default ModalTalent
