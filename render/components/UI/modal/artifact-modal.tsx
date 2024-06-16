'use client'

import { Tooltip } from '@nextui-org/tooltip'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { InputWrapper, selectInputWrapper } from '@/utils/classes'
import { IconPlus, IconStarFilled } from '@tabler/icons-react'
import { Select, SelectItem } from '@nextui-org/select'
import { Controller } from 'react-hook-form'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/modal'
import { useCreateArtifact } from '@/utils/hooks/panel/use-create-artifact'
import { raritys } from '@/constants'
import Editor from '@/render/components/UI/editor/editor'
import DropImage from '@/render/components/UI/drop-image'
import ModalButton from '@/render/components/UI/buttons/modal/modal-button'

const ArtifactModal = () => {
  const {
    isEditActive,
    control,
    errors,
    isPending,
    key,
    modalName,
    onSubmit,
    onOpenModal,
    onOpenChange
  } = useCreateArtifact()

  return (
    <>
      <Tooltip
        className='bg-color-dark'
        content={<p className='font-bold'>Crear artefacto</p>}
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
                {isEditActive ? 'Editando artefacto' : 'Nuevo artefacto'}
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
                      isDisabled={isPending}
                      classNames={InputWrapper}
                      errorMessage={errors.name?.message}
                      isInvalid={!!errors.name}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name='starsText'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        items={raritys.slice(0, 3)}
                        label='Selecciona la rareza'
                        className='max-w-full'
                        isDisabled={isPending}
                        errorMessage={errors.starsText?.message}
                        isInvalid={!!errors.starsText}
                        classNames={selectInputWrapper}
                        key={key}
                        defaultSelectedKeys={isEditActive ? [field.value] : []}
                        renderValue={(value) => {
                          return value.map(({ data, key }) => (
                            <div key={key} className='flex gap-2 items-center'>
                              <IconStarFilled
                                size={24}
                                className='text-yellow-500'
                              />
                              <span className='capitalize'>{data?.title}</span>
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
                      placeholder='Descripción del artefacto'
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

export default ArtifactModal
