'use client'

import { set, z } from 'zod'

import { Tooltip } from '@nextui-org/tooltip'
import { Button } from '@nextui-org/button'
import { IconPlus } from '@tabler/icons-react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { Avatar } from '@nextui-org/avatar'

import { Controller, useForm } from 'react-hook-form'
import { elements, raritys, role, weapons } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { CharacterSchema } from '@/schemas'
import { useTransition } from 'react'
import { createCharacters } from '@/render/services/panel/characters/create'
import { useDropImage } from '@/utils/store/use-drop-image'
import { downloadImage } from '@/utils/helpers/download-image'
import { toast } from 'sonner'
import DropImage from '@/render/components/panel/drop-image'

const CharacterModal = () => {
  const [isPending, starTransition] = useTransition()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { image, setImage } = useDropImage((state) => ({
    image: state.image,
    setImage: state.setImage
  }))

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterSchema>>({
    resolver: zodResolver(CharacterSchema),
    defaultValues: {
      name: '',
      element: '',
      role: '',
      weapon: '',
      rarityText: '',
      rarity: 0
    }
  })

  const handleReset = () => {
    reset()
    setImage({ imgFile: null, imgPreview: '' })
    onOpenChange()
  }

  const onSubmit = handleSubmit((data) => {
    const rarityNumber = Number(
      raritys.find((rarity) => rarity.name === data.rarityText)?.title[0]
    )

    const newValues = {
      ...data,
      rarity: rarityNumber
    }

    starTransition(async () => {
      console.log(image.file)

      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      const { data, status, error, message } = await createCharacters(newValues)

      downloadImage({
        id: data?.id!,
        path: 'characters',
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
          className='bg-color-success w-16 h-16 absolute bottom-0 right-0'
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
        <ModalContent>
          {(onClose) => (
            <form onSubmit={onSubmit}>
              <ModalHeader className='flex flex-col gap-1'>
                Nuevo Personaje
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
                      classNames={{
                        inputWrapper:
                          'bg-color-darkest data-[hover=true]:bg-color-dark-hover group-data-[focus=true]:bg-color-dark-hover'
                      }}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name='element'
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={elements}
                      label='Tipo de elemento'
                      className='max-w-full'
                      isDisabled={isPending}
                      errorMessage={errors.element?.message}
                      isInvalid={!!errors.element}
                      classNames={{
                        popoverContent: 'bg-color-darkest',
                        trigger:
                          'bg-color-darkest data-[hover=true]:bg-color-dark-hover'
                      }}
                      renderValue={(value) => {
                        return value.map(({ data, key }) => (
                          <div key={key} className='flex gap-2 items-center'>
                            <Avatar
                              src={data?.icon}
                              size='sm'
                              className='w-6 h-6'
                            />
                            <span className='capitalize'>{data?.name}</span>
                          </div>
                        ))
                      }}
                      {...field}
                    >
                      {(element) => (
                        <SelectItem
                          textValue={element.name}
                          key={element.name}
                          value={element.name}
                        >
                          <div className='flex gap-2 items-center'>
                            <Avatar src={element.icon} size='sm' />
                            <span className='capitalize'>{element.name}</span>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

                <Controller
                  name='role'
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={role}
                      label='Rol'
                      className='max-w-full'
                      isDisabled={isPending}
                      errorMessage={errors.role?.message}
                      isInvalid={!!errors.role}
                      classNames={{
                        popoverContent: 'bg-color-darkest',
                        trigger:
                          'bg-color-darkest data-[hover=true]:bg-color-dark-hover'
                      }}
                      renderValue={(value) => {
                        return value.map(({ data, key }) => (
                          <div key={key} className='flex gap-2 items-center'>
                            <span className='capitalize'>{data?.title}</span>
                          </div>
                        ))
                      }}
                      {...field}
                    >
                      {(rol) => (
                        <SelectItem
                          textValue={rol.name}
                          key={rol.name}
                          value={rol.title}
                        >
                          <div className='flex gap-2 items-center'>
                            <span className='capitalize'>{rol.title}</span>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

                <Controller
                  name='weapon'
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={weapons}
                      label='Tipo de arma'
                      className='max-w-full'
                      isDisabled={isPending}
                      errorMessage={errors.weapon?.message}
                      isInvalid={!!errors.weapon}
                      classNames={{
                        popoverContent: 'bg-color-darkest',
                        trigger:
                          'bg-color-darkest data-[hover=true]:bg-color-dark-hover'
                      }}
                      renderValue={(value) => {
                        return value.map(({ data, key }) => (
                          <div key={key} className='flex gap-2 items-center'>
                            <Avatar
                              src={data?.icon}
                              size='sm'
                              className='w-6 h-6'
                            />
                            <span className='capitalize'>{data?.title}</span>
                          </div>
                        ))
                      }}
                      {...field}
                    >
                      {(weapon) => (
                        <SelectItem
                          textValue={weapon.name}
                          key={weapon.name}
                          value={weapon.title}
                        >
                          <div className='flex gap-2 items-center'>
                            <Avatar src={weapon.icon} size='sm' />
                            <span className='capitalize'>{weapon.title}</span>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

                <Controller
                  name='rarityText'
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={raritys.slice(1, 3)}
                      label='Selecciona la rareza'
                      className='max-w-full'
                      isDisabled={isPending}
                      errorMessage={errors.rarityText?.message}
                      isInvalid={!!errors.rarityText}
                      classNames={{
                        popoverContent: 'bg-color-darkest',
                        trigger:
                          'bg-color-darkest data-[hover=true]:bg-color-dark-hover'
                      }}
                      renderValue={(value) => {
                        return value.map(({ data, key }) => (
                          <div key={key} className='flex gap-2 items-center'>
                            <Avatar
                              src={data?.icon}
                              size='sm'
                              className='w-6 h-6'
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
                            <Avatar src={rarity.icon} size='sm' />
                            <span className='capitalize'>{rarity.title}</span>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
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
      </Modal>
    </>
  )
}

export default CharacterModal
