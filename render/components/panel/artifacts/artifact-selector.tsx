import { z } from 'zod'
import { CharacterItemSchema } from '@/schemas'
import { Characters } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import { zodResolver } from '@hookform/resolvers/zod'
import { Artifact } from '@prisma/client'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CharacterItemError } from '@/render/components/UI/errors/character-error'
import { createArtifactCharacters } from '@/render/services/panel/artifacts/create'
import { Button, Chip, Image, Select, SelectItem } from '@nextui-org/react'
import { selectorItemWrapper } from '@/utils/classes'
import { IconPlus } from '@tabler/icons-react'
import { toast } from 'sonner'
import Figure from '@/render/components/UI/misc/figure'
import useSWR, { mutate } from 'swr'

const ArtifactSelector = ({
  character
}: {
  character: Characters | undefined
}) => {
  const {
    data: artifacts,
    isLoading,
    error
  } = useSWR<Artifact[]>('/api/artifacts', fetcher)

  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')
  const allArtifacts = character?.artifacts
  const disabledItems = allArtifacts?.map((item) => item.item)
  const MAX_ITEMS = 5

  const [isPending, startTransition] = useTransition()
  const [defaultKey, setKey] = useState<string>('default-key')

  const handleGenerateKey = () => {
    setKey(crypto.randomUUID())
  }

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

  const onSubmit = handleSubmit((data) => {
    const newArtifacts = data.items.split(',').map((item: string, index) => ({
      item: item,
      characterId: character?.id,
      order: index++
    }))

    const CURRENT_ITEMS = [...allArtifacts!, ...newArtifacts]
    if (CURRENT_ITEMS.length > MAX_ITEMS)
      return toast.error(`No puedes añadir más de ${MAX_ITEMS} materiales.`)

    startTransition(async () => {
      const { status, message, error } = await createArtifactCharacters(
        newArtifacts
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

  if (error)
    return <CharacterItemError message='No se ha podido cargar el selector.' />

  if (isLoading) return null

  if (allArtifacts?.length === MAX_ITEMS) return null

  return (
    <form onSubmit={onSubmit} className='space-y-2'>
      <Controller
        name='items'
        control={control}
        render={({ field }) => {
          return (
            <>
              <Select
                aria-label='Artifact Selector'
                placeholder='Selecciona los artefactos'
                selectionMode='multiple'
                className='w-full'
                isMultiline={true}
                key={defaultKey}
                items={artifacts}
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
                {(weapon) => (
                  <SelectItem key={weapon.id} textValue={weapon.name}>
                    <div className='flex gap-2 items-center'>
                      <Figure width='w-10' height='h-10'>
                        <Image
                          radius='sm'
                          className='w-full h-full object-cover'
                          src={weapon.imageUrl!}
                          alt={weapon.name}
                        />
                      </Figure>
                      <span>{weapon.name}</span>
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
        startContent={<IconPlus />}
        isDisabled={isLoading}
        isLoading={isPending}
        className='bg-color-light text-color-darkest font-bold'
        type='submit'
        size='lg'
      >
        Añadir Artefactos
      </Button>
    </form>
  )
}

export default ArtifactSelector
