'use client'

import { CharacterType } from '@/render/src/types'
import {
  Button,
  Chip,
  Image,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/render/src/panel/character/shared/components/alert'
import {
  InputWrapperDarkest,
  selectInputWrapperDarkest
} from '@/render/src/shared/utilities/classes'
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
import { Controller } from 'react-hook-form'
import { useAscensionForm } from '@/render/src/panel/character/ascension/utilities/hooks/use-ascension-form'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Material } from '@prisma/client'
import { Figure } from '@/render/src/shared/components/figure'

interface AscensionFormProps {
  character: CharacterType
}

const AscensionForm = ({ character }: AscensionFormProps) => {
  const {
    data: materials,
    isLoading,
    error
  } = useFetch<Material[]>('/api/materials')

  const {
    isOpen,
    isPending,
    FULL_ITEMS,
    control,
    errors,
    onOpen,
    onOpenChange,
    onSubmit
  } = useAscensionForm({ character })

  if (error)
    return (
      <Alert variant='error'>
        <AlertTitle>¡Error!</AlertTitle>
        <AlertDescription>Ha ocurrido un error inesperado.</AlertDescription>
      </Alert>
    )

  if (FULL_ITEMS) return null

  return (
    <Sheet>
      <SheetTrigger
        fullWidth
        isDisabled={isLoading || isPending}
        onPress={onOpen}
      >
        Agregar Ascensión
      </SheetTrigger>
      <SheetContent
        className='bg-color-dark w-[400px] sm:w-[640px]'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <form onSubmit={onSubmit} className='w-full space-y-4'>
          <SheetHeader>
            <SheetTitle>Quieres agregar una ascensión?</SheetTitle>
            <SheetDescription>
              Agrega una ascensión al personaje seleccionado.
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
            <div className='grid grid-cols-1 gap-2'>
              <Controller
                name='level'
                control={control}
                render={({ field }) => (
                  <Input
                    classNames={InputWrapperDarkest}
                    isInvalid={!!errors.level}
                    errorMessage={errors.level?.message}
                    type='number'
                    label='Nivel'
                    placeholder='20'
                    {...field}
                  />
                )}
              />

              <Controller
                name='cost'
                control={control}
                render={({ field }) => (
                  <Input
                    classNames={InputWrapperDarkest}
                    isInvalid={!!errors.cost}
                    errorMessage={errors.cost?.message}
                    type='number'
                    label='Costo'
                    placeholder='20000'
                    {...field}
                  />
                )}
              />

              <Controller
                name='materials'
                control={control}
                render={({ field }) => (
                  <Select
                    label='Materiales'
                    aria-label='Material Selector'
                    placeholder='Selecciona los materiales'
                    selectionMode='multiple'
                    className='w-full'
                    isMultiline={true}
                    items={materials}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    classNames={selectInputWrapperDarkest}
                    onSelectionChange={field.onChange}
                    isInvalid={!!errors.materials}
                    errorMessage={errors.materials?.message}
                    renderValue={(value) => {
                      return value.map(({ data, key }) => (
                        <div key={key} className='flex flex-wrap gap-4'>
                          <Chip className='bg-color-dark px-2 py-1 rounded-md'>
                            {data?.name}
                          </Chip>
                        </div>
                      ))
                    }}
                    {...field}
                  >
                    {(material) => (
                      <SelectItem textValue={material.name} key={material.id}>
                        <div className='flex gap-2 items-center'>
                          <Figure size='sm'>
                            <Image
                              radius='sm'
                              className='w-full h-full object-cover'
                              src={material.imageUrl!}
                              alt={material.name}
                            />
                          </Figure>
                          <span className='line-clamp-1'>{material.name}</span>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                )}
              />
            </div>
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
              Agregar
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default AscensionForm
