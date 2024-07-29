'use client'

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
import { Tooltip } from '@nextui-org/tooltip'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { IconPlus, IconStarFilled } from '@tabler/icons-react'
import { Select, SelectItem } from '@nextui-org/select'
import { Controller } from 'react-hook-form'
import { Chip } from '@nextui-org/react'
import { useCreateArtifact } from '@/render/src/panel/artifacts/utilities/hooks/use-create-artifact'
import { stars } from '@/render/src/shared/constants'
import DropImage from '@/render/src/panel/shared/components/ui/drop-image'
import Editor from '@/render/src/shared/components/editor/editor'

const ArtifactSheet = () => {
  const {
    isEditActive,
    control,
    errors,
    isPending,
    isOpen,
    onSubmit,
    onOpen,
    onOpenChange
  } = useCreateArtifact()

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
            <SheetTitle>Crear artefacto</SheetTitle>
            <SheetDescription>
              Agrega un nuevo artefacto a la lista de artefactos.
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
                  placeholder='Descripción del artefacto'
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

export default ArtifactSheet
