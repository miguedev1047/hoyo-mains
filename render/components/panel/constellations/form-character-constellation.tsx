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
import { useCreateConstellation } from '@/utils/hooks/panel/use-create-constellation'
import Editor from '@/render/components/UI/editor/editor'
import DropImage from '@/render/components/UI/drop-image'

const FormCharacterConstellation = ({
  character
}: {
  character: Characters | undefined
}) => {
  const constellations = character?.constellations
  const MAX_CONSTELLATIONS = 3
  const CONSTELLATIONS_LENGTH = constellations?.length

  const {
    key,
    isPending,
    errors,
    control,
    modalName,
    isEditActive,
    onOpen,
    onSubmit,
    onOpenChange
  } = useCreateConstellation(character)

  return (
    <>
      {(CONSTELLATIONS_LENGTH ?? 0) !== MAX_CONSTELLATIONS && (
        <Button
          fullWidth
          size='lg'
          type='submit'
          color='success'
          startContent={<IconPlus />}
          className=' bg-color-light font-bold'
          onPress={() => onOpen(true, 'constellation-modal')}
        >
          Agregar Constelación
        </Button>
      )}
      <Modal
        size='4xl'
        isOpen={modalName === 'constellation-modal'}
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
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      className='col-span-2'
                      label='Nombre de la constelación'
                      placeholder='Constelación 1'
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
                      key={key}
                      errorMessage={errors.description?.message}
                      placeholder='Descripción de la constelación'
                      description={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <DropImage />
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  size='lg'
                  type='submit'
                  color='success'
                  isLoading={isPending}
                  className=' bg-color-light font-bold'
                >
                  {isEditActive ? 'Editar' : 'Crear'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default FormCharacterConstellation
