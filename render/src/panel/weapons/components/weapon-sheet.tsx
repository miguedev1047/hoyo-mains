'use client'

import {
  Button,
  Chip,
  Image,
  Input,
  Select,
  SelectItem,
  Tooltip
} from '@nextui-org/react'
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/render/src/shared/components/sheet'
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
import Editor from '@/render/src/shared/components/editor/editor'

const WeaponSheet = () => {
  const {
    isEditActive,
    control,
    errors,
    isPending,
    isOpen,
    onSubmit,
    onOpenSheet,
    onOpenChange
  } = useCreateWeapon()

  return (
    <Sheet>
      <Tooltip
        className='bg-color-dark'
        content={<p className='font-bold'>Crear arma</p>}
      >
        <SheetTrigger
          isIconOnly
          radius='full'
          color='success'
          variant='shadow'
          onPress={onOpenSheet}
          className='bg-color-success w-16 h-16 fixed bottom-8 right-8 z-40'
        >
          <IconPlus size={40} />
        </SheetTrigger>
      </Tooltip>
      <SheetContent
        className='bg-color-dark w-[400px] sm:w-[640px]'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <form onSubmit={onSubmit} className='w-full space-y-4'>
          <SheetHeader>
            <SheetTitle>Crear arma</SheetTitle>
            <SheetDescription>
              Agrega una nueva arma a la lista de armas.
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
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
                  isEdit={isEditActive}
                  errorMessage={errors.description?.message}
                  placeholder='Descripción del arma'
                  description={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </SheetBody>
          <SheetFooter>
            <Button
              size='lg'
              radius='sm'
              color='success'
              type='submit'
              isLoading={isPending}
              className='bg-color-light font-bold'
            >
              Crear
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default WeaponSheet
