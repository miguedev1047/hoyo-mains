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
  InputWrapperDarkest,
  selectInputWrapperDarkest
} from '@/render/src/shared/utilities/classes'
import { IconPlus, IconStarFilled } from '@tabler/icons-react'
import { useCreateWeapon } from '@/render/src/panel/weapons/utilities/hooks/use-create-weapon'
import { Figure } from '@/render/src/shared/components/figure'
import { stars, weaponTypes, stats } from '@/render/src/shared/constants'
import { Controller } from 'react-hook-form'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'
import ModalButton from '@/render/src/panel/shared/components/buttons/modal-button'
import Editor from '@/render/src/shared/components/editor/editor'

const WeaponModal = () => {
  const {
    isEditActive,
    control,
    errors,
    isPending,
    modalName,
    onSubmit,
    onOpenModal,
    onOpenChange
  } = useCreateWeapon()

  return (
    <>
      <Tooltip
        className='bg-color-dark'
        content={<p className='font-bold'>Crear arma</p>}
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
                {isEditActive ? 'Editando arma' : 'Nuevo arma'}
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
                      classNames={InputWrapperDarkest}
                      errorMessage={errors.name?.message}
                      isInvalid={!!errors.name}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name='stat'
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={stats}
                      label='Selecciona la estadística'
                      className='max-w-full'
                      isDisabled={isPending}
                      isLoading={isPending}
                      errorMessage={errors.stat?.message}
                      isInvalid={!!errors.stat}
                      classNames={selectInputWrapperDarkest}
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
                  name='type'
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={weaponTypes}
                      label='Tipo de arma'
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
                              <p className='capitalize'>{data?.name}</p>
                            </Chip>
                          </div>
                        ))
                      }}
                      {...field}
                    >
                      {(weapon) => (
                        <SelectItem
                          textValue={weapon.name}
                          key={weapon.id}
                          value={weapon.id}
                        >
                          <div className='flex items-center gap-2'>
                            <Figure size='sm'>
                              <Image
                                className='w-full h-full object-cover'
                                src={weapon.icon}
                                alt={weapon.name}
                              />
                            </Figure>
                            <span className='capitalize'>{weapon.name}</span>
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
                        errorMessage={errors.stars?.message}
                        isInvalid={!!errors.stars}
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
                  name='atk'
                  control={control}
                  render={({ field }) => (
                    <Input
                      className='col-span-2'
                      type='number'
                      label='ATQ. base'
                      isDisabled={isPending}
                      classNames={InputWrapperDarkest}
                      errorMessage={errors.atk?.message}
                      isInvalid={!!errors.atk}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <Editor
                      isPending={isPending}
                      isEdit={isEditActive}
                      errorMessage={errors.description?.message}
                      placeholder='Descripción del arma'
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

export default WeaponModal
