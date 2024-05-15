'use client'

import { z } from 'zod'
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
import { startTransition, useEffect, useState, useTransition } from 'react'
import { downloadImage } from '@/utils/helpers/download-image'
import { toast } from 'sonner'
import { materialType, raritys } from '@/constants'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MaterialSchema } from '@/schemas'
import { useDropImage } from '@/utils/store/use-drop-image'
import { createMaterials } from '@/render/services/panel/materials/create'
import { Input } from '@nextui-org/input'
import { InputWrapper, selectInputWrapper } from '@/utils/classes'
import { useOpen } from '@/utils/store/use-open'
import { dataMaterialById } from '@/render/services/panel/materials/data'
import { updateMaterials } from '@/render/services/panel/materials/update'
import { mutate } from 'swr'
import Editor from '@/render/components/UI/editor/editor'
import DropImage from '@/render/components/UI/drop-image'
import { useCreateMaterial } from '@/utils/hooks/use-create-material'

const MaterialModal = () => {
  const { onOpen, onOpenChange, open } = useOpen((state) => ({
    open: state.open,
    onOpen: state.onOpen,
    onOpenChange: state.onOpenChange
  }))

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
        <ContentModal onOpenChange={onOpenChange} />
      </Modal>
    </>
  )
}

const ContentModal = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const { key, control, errors, isPending, isEditActive, onSubmit } =
    useCreateMaterial(onOpenChange)

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={onSubmit}>
          <ModalHeader className='flex flex-col gap-1 text-2xl capitalize'>
            {isEditActive ? 'Editando material' : 'Nuevo material'}
          </ModalHeader>
          <ModalBody className='grid grid-cols-2'>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
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
                  errorMessage={errors.type?.message}
                  isInvalid={!!errors.type}
                  classNames={selectInputWrapper}
                  key={key}
                  defaultSelectedKeys={
                    isEditActive ? [field.value.toUpperCase()] : []
                  }
                  renderValue={(value) => {
                    return value.map(({ data, key }) => (
                      <div key={key}>
                        <span className='capitalize'>{data?.name}</span>
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
                        <span className='capitalize'>{element.name}</span>
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
                  key={key}
                  placeholder='Descripción del material'
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
              isLoading={isPending}
            >
              {isEditActive ? 'Editar' : 'Crear'}
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  )
}

export default MaterialModal
