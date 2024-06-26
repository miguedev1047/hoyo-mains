'use client'

import { Tooltip } from '@nextui-org/tooltip'
import { Button } from '@nextui-org/button'
import { IconPlus, IconStarFilled } from '@tabler/icons-react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { Avatar } from '@nextui-org/avatar'
import { Controller } from 'react-hook-form'
import { elements, raritys, role, weapons } from '@/constants'
import { InputWrapper, selectInputWrapper } from '@/utils/classes'
import { useCreateCharacter } from '@/utils/hooks/panel/use-create-character'
import DropImage from '@/render/components/UI/drop-image'
import ModalButton from '@/render/components/UI/buttons/modal/modal-button'
import { Chip, Image } from '@nextui-org/react'

const CharacterModal = () => {
  const {
    errors,
    isPending,
    control,
    modalName,
    onSubmit,
    onOpenModal,
    onOpenChange
  } = useCreateCharacter()

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
                Nuevo personaje
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
                      classNames={selectInputWrapper}
                      renderValue={(value) => {
                        return value.map(({ data, key }) => (
                          <div key={key}>
                            <Chip radius='sm' size='sm'>
                              <p className='capitalize'>{data?.name}</p>
                            </Chip>
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
                          <div className='flex items-center gap-2'>
                            <figure className='w-10 h-10 p-1 bg-primary-color rounded-md relative overflow-hidden'>
                              <Image
                                className='w-full h-full object-cover'
                                src={element.icon}
                                alt={element.name}
                              />
                            </figure>
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
                      classNames={selectInputWrapper}
                      renderValue={(value) => {
                        return value.map(({ data, key }) => (
                          <div key={key}>
                            <Chip radius='sm' size='sm'>
                              <p className='capitalize'>{data?.name}</p>
                            </Chip>
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
                      classNames={selectInputWrapper}
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
                      {(weapon) => (
                        <SelectItem
                          textValue={weapon.name}
                          key={weapon.name}
                          value={weapon.title}
                        >
                          <div className='flex items-center gap-2'>
                            <figure className='w-10 h-10 p-1 bg-primary-color rounded-md relative overflow-hidden'>
                              <Image
                                className='w-full h-full object-cover'
                                src={weapon.icon}
                                alt={weapon.name}
                              />
                            </figure>
                            <span className='capitalize'>{weapon.title}</span>
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
                      items={raritys.slice(0, 2)}
                      label='Selecciona la rareza'
                      className='max-w-full'
                      isDisabled={isPending}
                      errorMessage={errors.starsText?.message}
                      isInvalid={!!errors.starsText}
                      classNames={selectInputWrapper}
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
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <ModalButton isLoading={isPending}>Crear</ModalButton>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default CharacterModal
