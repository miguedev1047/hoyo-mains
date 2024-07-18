'use client'

import {
  Button,
  Chip,
  Image,
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
import {
  InputWrapper,
  selectInputWrapperDarkest
} from '@/render/src/shared/utilities/classes'
import { useCreateCharacter } from '@/render/src/panel/characters/utilities/hooks/use-create-character'
import { IconPlus, IconStarFilled } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { elements, role, stars, weapons } from '@/render/src/shared/constants'
import { Figure } from '@/render/src/shared/components/figure'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'
import ModalButton from '@/render/src/panel/shared/components/buttons/modal-button'

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
                      classNames={selectInputWrapperDarkest}
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
                            <Figure>
                              <Image
                                className='w-full h-full object-cover'
                                src={element.icon}
                                alt={element.name}
                              />
                            </Figure>
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
                      classNames={selectInputWrapperDarkest}
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
                      classNames={selectInputWrapperDarkest}
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
                            <Figure>
                              <Image
                                className='w-full h-full object-cover'
                                src={weapon.icon}
                                alt={weapon.name}
                              />
                            </Figure>
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
                      items={stars.slice(0, 2)}
                      label='Selecciona la rareza'
                      className='max-w-full'
                      isDisabled={isPending}
                      errorMessage={errors.starsText?.message}
                      isInvalid={!!errors.starsText}
                      classNames={selectInputWrapperDarkest}
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
                      {(stars) => (
                        <SelectItem
                          textValue={stars.name}
                          value={stars.name}
                          key={stars.name}
                        >
                          <div className='flex gap-2 items-center'>
                            <IconStarFilled
                              size={24}
                              className='text-yellow-500'
                            />
                            <span className='capitalize'>{stars.title}</span>
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
