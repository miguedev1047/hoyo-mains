import { z } from 'zod'
import { CharacterItemSchema } from '@/schemas'
import { fetcher } from '@/utils/helpers/fetcher'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Chip, Image, Select, SelectItem } from '@nextui-org/react'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createMaterialCharacters } from '@/render/services/panel/materials/create'
import { Material } from '@prisma/client'
import { CharacterTypes } from '@/types'
import { toast } from 'sonner'
import { selectorItemWrapper } from '@/utils/classes'
import { HomeErrorItem } from '@/render/components/UI/errors'
import { IconPlus } from '@tabler/icons-react'
import useSWR, { mutate } from 'swr'
import Figure from '@/render/components/UI/misc/figure'

const MaterialSelector = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  const {
    data: materials,
    isLoading,
    error
  } = useSWR<Material[]>('/api/materials', fetcher)

  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')
  const allMaterials = character?.materials
  const disabledItems = allMaterials?.map((item) => item.item)
  const MAX_ITEMS = 6

  const [isPending, startTransition] = useTransition()
  const [defaultKey, setKey] = useState<string>('')

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterItemSchema>>({
    resolver: zodResolver(CharacterItemSchema),
    defaultValues: {
      items: ''
    }
  })

  const handleGenerateKey = () => {
    setKey(crypto.randomUUID())
  }

  const onSubmit = handleSubmit((data) => {
    const newMaterials = data.items.split(',').map((item: string, index) => ({
      item: item,
      characterId: character?.id,
      order: index++
    }))

    const CURRENT_ITEMS = [...allMaterials!, ...newMaterials]
    if (CURRENT_ITEMS.length > MAX_ITEMS)
      return toast.error(`No puedes añadir más de ${MAX_ITEMS} materiales.`)

    startTransition(async () => {
      const { status, message, error } = await createMaterialCharacters(
        newMaterials
      )

      if (status === 201) {
        reset()
        mutate(`/api/characters/character?name=${characterName}`)
        toast.success(message)
        handleGenerateKey()
        return
      }

      toast.error(error)
    })
  })

  if (error) return <HomeErrorItem />
  if (isLoading) return null
  if (allMaterials?.length === MAX_ITEMS) return null

  return (
    <form onSubmit={onSubmit} className='space-y-2'>
      <Controller
        name='items'
        control={control}
        render={({ field }) => {
          return (
            <>
              <Select
                aria-label='Material Selector'
                placeholder='Selecciona los materiales'
                selectionMode='multiple'
                className='w-full'
                isMultiline={true}
                key={defaultKey}
                items={materials}
                isLoading={isLoading}
                isDisabled={isLoading}
                classNames={selectorItemWrapper}
                disabledKeys={disabledItems}
                onSelectionChange={field.onChange}
                isInvalid={!!errors.items}
                errorMessage={errors.items?.message}
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
                  <SelectItem key={material.id} textValue={material.name}>
                    <div className='flex gap-2 items-center'>
                      <Figure width='w-10' height='h-10'>
                        <Image
                          radius='sm'
                          className='w-full h-full object-cover'
                          src={material.imageUrl!}
                          alt={material.name}
                        />
                      </Figure>
                      <span>{material.name}</span>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </>
          )
        }}
      />

      <Button
        fullWidth
        size='lg'
        startContent={<IconPlus />}
        isDisabled={isLoading}
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
