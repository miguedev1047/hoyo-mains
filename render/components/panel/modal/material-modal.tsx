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
  ModalFooter,
  useDisclosure
} from '@nextui-org/modal'
import { useState, useTransition } from 'react'
import { downloadImage } from '@/utils/helpers/download-image'
import { toast } from 'sonner'
import { materialType, raritys, startTextColorMap } from '@/constants'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MaterialSchema } from '@/schemas'
import { useDropImage } from '@/utils/store/use-drop-image'
import { createMaterials } from '@/render/services/panel/materials/create'
import { Input } from '@nextui-org/input'
import { InputWrapper, selectInputWrapper } from '@/utils/classes'
import Editor from '@/render/components/UI/editor/editor'
import DropImage from '@/render/components/UI/drop-image'

const MaterialModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Tooltip
        className='bg-color-dark'
        content={<p className='font-bold'>Crear personaje</p>}
      >
        <Button
          isIconOnly
          radius='full'
          color='success'
          variant='shadow'
          onPress={onOpen}
          className='bg-color-success w-16 h-16 fixed bottom-8 right-8'
        >
          <IconPlus size={40} />
        </Button>
      </Tooltip>
      <Modal
        size='4xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='bg-color-dark'
      >
        <ContentModal onOpenChange={onOpenChange} />
      </Modal>
    </>
  )
}

const ContentModal = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const [isPending, starTransition] = useTransition()
  const [key, setKey] = useState(+new Date())

  const { image, setImage } = useDropImage((state) => ({
    image: state.image,
    setImage: state.setImage
  }))

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof MaterialSchema>>({
    resolver: zodResolver(MaterialSchema),
    defaultValues: {
      description: '',
      name: '',
      type: '',
      label: 'none',
      value: 'none',
      starsText: '',
      stars: 0
    }
  })

  const handleReset = () => {
    reset()
    setImage({ imgFile: null, imgPreview: '' })
    onOpenChange()
  }

  const onSubmit = handleSubmit((data) => {
    const starsNumber = Number(
      raritys.find((rarity) => rarity.name === data.starsText)?.title[0]
    )

    const newValues = {
      ...data,
      stars: starsNumber,
      type: data.type.toLocaleLowerCase(),
      label: data.name,
      value: data.name
    }

    starTransition(async () => {
      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      const { data, status, error, message } = await createMaterials(newValues)

      downloadImage({
        id: data?.id!,
        path: 'materials',
        imgFile: image.file
      })

      if (status === 201) {
        toast.success(message)
        handleReset()
        return
      }

      toast.error(error)
    })
  })

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={onSubmit}>
          <ModalHeader className='flex flex-col gap-1 text-2xl capitalize'>
            Nuevo material
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
              render={({ field }) => (
                <Select
                  items={raritys}
                  label='Selecciona la rareza'
                  className='max-w-full'
                  isDisabled={isPending}
                  errorMessage={errors.starsText?.message}
                  isInvalid={!!errors.starsText}
                  classNames={selectInputWrapper}
                  renderValue={(value) => {
                    return value.map(({ data, key }) => (
                      <div key={key} className='flex gap-2 items-center'>
                        <IconStarFilled
                          size={24}
                          className={
                            startTextColorMap[
                              data?.number as keyof typeof startTextColorMap
                            ] || 'text-gray-500'
                          }
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
                          className={
                            startTextColorMap[
                              rarity.number as keyof typeof startTextColorMap
                            ] || 'text-gray-500'
                          }
                        />
                        <span className='capitalize'>{rarity.title}</span>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              )}
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
              Crear
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  )
}

export default MaterialModal
