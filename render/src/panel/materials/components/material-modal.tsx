'use client'

import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip
} from '@nextui-org/react'
import { useCreateMaterial } from '@/render/src/panel/materials/utilities/hooks/use-create-material'
import { IconPlus, IconStarFilled } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { InputWrapper } from '@/utils/classes'
import { materialType, stars } from '@/render/src/shared/constants'
import { selectInputWrapperDarkest } from '@/render/src/shared/utilities/classes'
import Editor from '@/render/src/shared/components/editor/editor'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'
import ModalButton from '@/render/src/panel/shared/components/buttons/modal-button'

const MaterialModal = () => {
  const {
    control,
    errors,
    isPending,
    isEditActive,
    modalName,
    onOpenModal,
    onSubmit,
    onOpenChange
  } = useCreateMaterial()

  return (
    <>
      <Tooltip
        className='bg-color-dark'
        content={<p className='font-bold'>Crear material</p>}
      >
        <Button
          isIconOnly
          radius='full'
          color='success'
          variant='shadow'
          onPress={onOpenModal}
          className='bg-color-success w-16 h-16 fixed bottom-8 right-8'
        >
          <IconPlus size={40} />
        </Button>
      </Tooltip>
      <Modal
        size='4xl'
        isOpen={modalName}
        onOpenChange={onOpenChange}
        className='bg-color-dark'
      >
        <ModalContent>
          {() => (
            <form onSubmit={onSubmit}>
              <ModalHeader className='flex flex-col gap-1 text-2xl capitalize'>
                {isEditActive ? 'Editando material' : 'Nuevo material'}
              </ModalHeader>
              <ModalBody className='grid grid-cols-2'>
                <DropImage />

                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'
                      label='Nombre'
                      className='col-span-2'
                      isDisabled={isPending}
                      errorMessage={errors.name?.message}
                      isInvalid={!!errors.name}
                      classNames={InputWrapper}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name='type'
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={materialType}
                      label='Tipo de material'
                      className='max-w-full'
                      isDisabled={isPending}
                      isLoading={isPending}
                      errorMessage={errors.type?.message}
                      isInvalid={!!errors.type}
                      classNames={selectInputWrapperDarkest}
                      selectedKeys={[field.value]}
                      renderValue={(value) => {
                        return value.map(({ data, key }) => (
                          <div key={key}>
                            <Chip radius='sm' size='sm'>
                              <p>{data?.title}</p>
                            </Chip>
                          </div>
                        ))
                      }}
                      {...field}
                    >
                      {(material) => (
                        <SelectItem
                          textValue={material.name}
                          key={material.name}
                          value={material.name}
                        >
                          <div>
                            <span>{material.title}</span>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

                <Controller
                  name='starsText'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        items={stars}
                        label='Selecciona la rareza'
                        className='max-w-full'
                        isDisabled={isPending}
                        isLoading={isPending}
                        errorMessage={errors.starsText?.message}
                        isInvalid={!!errors.starsText}
                        classNames={selectInputWrapperDarkest}
                        selectedKeys={[field.value]}
                        renderValue={(value) => {
                          return value.map(({ data, key }) => (
                            <div key={key}>
                              <Chip radius='sm' size='sm'>
                                <p className='capitalize'>{data?.title}</p>
                              </Chip>
                            </div>
                          ))
                        }}
                        {...field}
                      >
                        {(star) => (
                          <SelectItem
                            textValue={star.name}
                            value={star.name}
                            key={star.name}
                          >
                            <div className='flex gap-2 items-center'>
                              <IconStarFilled
                                size={24}
                                className='text-yellow-500'
                              />
                              <span className='capitalize'>{star.title}</span>
                            </div>
                          </SelectItem>
                        )}
                      </Select>
                    )
                  }}
                />

                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <Editor
                      isPending={isPending}
                      isEdit={isEditActive}
                      errorMessage={errors.description?.message}
                      placeholder='Descripción del material'
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

export default MaterialModal
