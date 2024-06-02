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

const CharacterModal = () => {
  const { errors, isPending, control, open, onSubmit, onOpen, onOpenChange } =
    useCreateCharacter()

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
                Nuevo personaje
              </ModalHeader>
              <ModalBody className='grid grid-cols-2'>
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
                      classNames={selectInputWrapper}
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
                      classNames={selectInputWrapper}
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
                  )}
                />

                <DropImage />
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
