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
import { raritys, stats, weaponTypes } from '@/constants'
import Editor from '@/render/components/UI/editor/editor'
import DropImage from '@/render/components/UI/drop-image'
import { useCreateWeapon } from '@/utils/hooks/panel/use-create-weapon'

const WeaponModal = () => {
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
                {isEditActive ? 'Editando arma' : 'Nuevo arma'}
              </ModalHeader>
              <ModalBody className='grid grid-cols-2'>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      type='text'
                      label='Nombre'
                      classNames={InputWrapper}
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
                      errorMessage={errors.stat?.message}
                      isInvalid={!!errors.stat}
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
                  name='type'
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={weaponTypes}
                      label='Tipo de arma'
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
                      errorMessage={errors.description?.message}
                      placeholder='Descripción del arma'
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

export default WeaponModal
