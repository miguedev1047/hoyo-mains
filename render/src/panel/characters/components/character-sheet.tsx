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
import { useCreateCharacter } from '@/render/src/panel/characters/utilities/hooks/use-create-character'
import { IconPlus, IconStarFilled } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { elements, role, stars, weapons } from '@/render/src/shared/constants'
import { Figure } from '@/render/src/shared/components/figure'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'

const CharacterSheet = () => {
  const { errors, isPending, control, isOpen, onSubmit, onOpen, onOpenChange } =
    useCreateCharacter()

  return (
    <Sheet>
      <Tooltip
        className='bg-color-dark'
        content={<p className='font-bold'>Crear personaje</p>}
      >
        <SheetTrigger
          isIconOnly
          radius='full'
          color='success'
          variant='shadow'
          onPress={onOpen}
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
            <SheetTitle>Crear personaje</SheetTitle>
            <SheetDescription>
              Agrega un nuevo personaje a la lista de personajes.
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
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name}
                  classNames={InputWrapperDarkest}
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
                        <IconStarFilled size={24} className='text-yellow-500' />
                        <span className='capitalize'>{stars.title}</span>
                      </div>
                    </SelectItem>
                  )}
                </Select>
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

export default CharacterSheet
