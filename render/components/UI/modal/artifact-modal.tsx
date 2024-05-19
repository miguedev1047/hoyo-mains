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

const ArtifactModal = () => {
  const {
    isEditActive,
    control,
    errors,
    isPending,
    key,
    open,
    onSubmit,
    onOpen,
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
          onPress={() => onOpen(true)}
          className='bg-color-success w-16 h-16 fixed bottom-8 right-8'
        >
          <IconPlus size={40} />
        </Button>
      </Tooltip>
      <Modal
        size='4xl'
        isOpen={open}
        onOpenChange={onOpenChange}
        className='bg-color-dark'
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={onSubmit}>
              <ModalHeader className='flex flex-col gap-1 text-2xl capitalize'>
                {isEditActive ? 'Editando artefacto' : 'Nuevo artefacto'}
              </ModalHeader>
              <ModalBody className='grid grid-cols-2'>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input
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
                  name='descTwoPieces'
                  control={control}
                  render={({ field }) => (
                    <Editor
                      key={key}
                      errorMessage={errors.descTwoPieces?.message}
                      placeholder='Descripción bono x2 piezas'
                      description={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <Controller
                  name='descFourPieces'
                  control={control}
                  render={({ field }) => (
                    <Editor
                      key={key}
                      errorMessage={errors.descFourPieces?.message}
                      placeholder='Descripción bono x4 piezas'
                      description={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <DropImage />
              </ModalBody>
              <ModalFooter className='grid grid-cols-2'>
                <Button
                  className='bg-color-darkest font-extrabold'
                  onPress={onClose}
                >
                  Cerrar
                </Button>
                <Button
                  type='submit'
                  color='success'
                  className='bg-color-lightest font-extrabold'
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

export default ArtifactModal