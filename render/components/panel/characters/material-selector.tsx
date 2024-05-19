import { z } from 'zod'
import { CharactersMaterialsSchema } from '@/schemas'
import { fetcher } from '@/utils/helpers/fetcher'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Chip, Select, SelectItem } from '@nextui-org/react'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createMaterialCharacters } from '@/render/services/panel/characters/create'
import { Material } from '@prisma/client'
import { Characters } from '@/types'
import { toast } from 'sonner'
import { selectorItemWrapper } from '@/utils/classes'
import useSWR, { mutate } from 'swr'

const MaterialSelector = ({ character }: { character: Characters }) => {
  const {
    data: materials,
    isLoading,
    error
  } = useSWR<Material[]>('/api/materials', fetcher)

  const allMaterials = character.materials
  const disableKeys = allMaterials.map((item) => item.item)

  const [isPending, startTransition] = useTransition()
  const [randomId, setRandomId] = useState<string>('')

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof CharactersMaterialsSchema>>({
    resolver: zodResolver(CharactersMaterialsSchema),
    defaultValues: {
      materials: ''
    }
  })

  const handleGenerateRandomId = () => {
    setRandomId(crypto.randomUUID())
  }

  const onSubmit = handleSubmit((data) => {
    const newMaterials = data.materials
      .split(',')
      .map((item: string, index) => ({
        item: item,
        characterId: character.id,
        order: index++
      }))

    const ITEM_LIMIT = 6
    const CURRENT_ITEMS = [...allMaterials, ...newMaterials]

    if (CURRENT_ITEMS.length > ITEM_LIMIT)
      return toast.error('No puedes añadir más de 6 materiales.')

    startTransition(async () => {
      const { status, message, error } = await createMaterialCharacters(
        newMaterials
      )

      if (status === 201) {
        reset()
        mutate(`/api/characters/character/${character.id}`)
        toast.success(message)
        handleGenerateRandomId()
        return
      }

      toast.error(error)
    })
  })

  if (allMaterials.length === 6) return
  if (error) return

  return (
    <form onSubmit={onSubmit} className='space-y-2'>
      <Controller
        name='materials'
        control={control}
        render={({ field }) => {
          const data = { ...field }
          const newFields = data.value.split(',')
          const newFieldsLength = newFields.length

          return (
            <Select
              selectionMode='multiple'
              className='w-full'
              isMultiline={true}
              key={randomId}
              items={materials}
              placeholder='Selecciona los materiales'
              isLoading={isLoading}
              isDisabled={isLoading || newFieldsLength === 6}
              onSelectionChange={field.onChange}
              classNames={selectorItemWrapper}
              disabledKeys={disableKeys}
              isInvalid={!!errors.materials}
              errorMessage={errors.materials?.message}
              renderValue={(value) => {
                return value.map(({ data, key }) => (
                  <div key={key} className='flex flex-wrap gap-4'>
                    <Chip className='bg-color-dark capitalize px-2 py-1 rounded-md'>
                      {data?.name}
                    </Chip>
                  </div>
                ))
              }}
              {...field}
            >
              {(material) => (
                <SelectItem key={material.id} textValue={material.name}>
                  <div className='flex gap-2 items-center'>
                    <Avatar src={material.imageUrl!} alt={material.name} />
                    <span className='capitalize'>{material.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          )
        }}
      />

      <Button
        fullWidth
        isLoading={isPending}
        className='bg-color-light text-color-darkest font-bold'
        type='submit'
      >
        Añadir Materiales
      </Button>
    </form>
  )
}

export default MaterialSelector
