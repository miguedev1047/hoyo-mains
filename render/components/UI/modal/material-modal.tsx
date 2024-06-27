'use client'

import { Tooltip } from '@nextui-org/tooltip'
import { Button } from '@nextui-org/button'
import { IconPlus, IconStarFilled } from '@tabler/icons-react'
import { Select, SelectItem } from '@nextui-org/select'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/modal'
import { materialType, raritys } from '@/constants'
import { Controller } from 'react-hook-form'
import { Input } from '@nextui-org/input'
import { InputWrapper, selectInputWrapper } from '@/utils/classes'
import { useCreateMaterial } from '@/utils/hooks/panel/use-create-material'
import { Chip } from '@nextui-org/react'
import Editor from '@/render/components/UI/editor/editor'
import DropImage from '@/render/components/UI/drop-image'
import ModalButton from '@/render/components/UI/buttons/modal/modal-button'

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
                      classNames={selectInputWrapper}
                      selectedKeys={[field.value]}
                      renderValue={(value) => {
                        return value.map(({ data, key }) => (
                          <div key={key}>
                            <Chip radius='sm' size='sm'>
                              <p>{data?.name}</p>
                            </Chip>
                          </div>
                        ))
                      }}
                      {...field}
                    >
                      {(element) => (
                        <SelectItem
                          textValue={element.name}
                          key={element.id}
                          value={element.id}
                        >
                          <div>
                            <span>{element.name}</span>
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
                        items={raritys}
                        label='Selecciona la rareza'
                        className='max-w-full'
                        isDisabled={isPending}
                        isLoading={isPending}
                        errorMessage={errors.starsText?.message}
                        isInvalid={!!errors.starsText}
                        classNames={selectInputWrapper}
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
                        {(rarity) => (
                          <SelectItem
                            textValue={rarity.name}
                            value={rarity.name}
                            key={rarity.name}
                          >
                            <div className='flex gap-2 items-center'>
                              <IconStarFilled
                                size={24}
                                className='text-yellow-500'
                              />
                              <span className='capitalize'>{rarity.title}</span>
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
