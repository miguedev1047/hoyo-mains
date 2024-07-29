'use client'

import {
  Button,
  Chip,
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
import { useCreateMaterial } from '@/render/src/panel/materials/utilities/hooks/use-create-material'
import { IconPlus, IconStarFilled } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { materialType, stars } from '@/render/src/shared/constants'
import {
  InputWrapperDarkest,
  selectInputWrapperDarkest
} from '@/render/src/shared/utilities/classes'
import Editor from '@/render/src/shared/components/editor/editor'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'

const MaterialSheet = () => {
  const {
    control,
    errors,
    isPending,
    isEditActive,
    isOpen,
    onOpen,
    onSubmit,
    onOpenChange
  } = useCreateMaterial()

  return (
    <Sheet>
      <Tooltip
        className='bg-color-dark'
        content={<p className='font-bold'>Crear material</p>}
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
            <SheetTitle>Crear material</SheetTitle>
            <SheetDescription>
              Agrega un nuevo material a la lista de materialess.
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
              name='type'
              control={control}
              render={({ field }) => (
                <Select
                  items={materialType}
                  label='Tipo de material'
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
                          <p>{data?.title}</p>
                        </Chip>
                      </div>
                    ))
                  }}
                  {...field}
                >
                  {(material) => (
                    <SelectItem
                      textValue={material.name}
                      key={material.name}
                      value={material.name}
                    >
                      <div>
                        <span>{material.title}</span>
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
                    errorMessage={errors.starsText?.message}
                    isInvalid={!!errors.starsText}
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
              name='description'
              control={control}
              render={({ field }) => (
                <Editor
                  isEdit={isEditActive}
                  errorMessage={errors.description?.message}
                  placeholder='Descripción del material'
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
              {isEditActive ? 'Guardar' : 'Crear'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default MaterialSheet
