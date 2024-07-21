import { InputWrapperDarkest } from '@/render/src/shared/utilities/classes'
import { CharacterType } from '@/render/src/types'
import { Button } from '@nextui-org/button'
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { useCreateConstellation } from '@/render/src/panel/character/tabs/constellations/utilities/hooks/use-constellations'
import ModalButton from '@/render/src/panel/shared/components/buttons/modal-button'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'
import Editor from '@/render/src/shared/components/editor/editor'

interface ConstellationModalProps {
  character: CharacterType
}

const ConstellationModal = ({ character }: ConstellationModalProps) => {
  const constellations = character?.constellations
  const MAX_CONSTELLATIONS = 6

  const CONSTELLATIONS_LENGTH = constellations?.length
  const MAX_ITEMS = CONSTELLATIONS_LENGTH >= MAX_CONSTELLATIONS

  const {
    isPending,
    errors,
    control,
    modalName,
    isEditActive,
    onOpenModal,
    onSubmit,
    onOpenChange
  } = useCreateConstellation({ character })

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
          Añadir Constelación
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
                  Constelación
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
                      isPending={isPending}
                      isEdit={isEditActive}
                      errorMessage={errors.description?.message}
                      placeholder='Descripción de la constelación'
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

export default ConstellationModal
