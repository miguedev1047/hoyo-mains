import { z } from 'zod'
import { createBestStats } from '@/render/services/panel/stats/create'
import { CharacterBestStatsSchema } from '@/schemas'
import { Characters } from '@/types'
import { InputWrapper } from '@/utils/classes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useEffect, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useEditStatStore } from '@/utils/store/use-edit-substat'
import { updateBestStats } from '@/render/services/panel/stats/update'
import { mutate } from 'swr'

const FormBestStat = ({ character }: { character: Characters | undefined }) => {
  const [isPending, startTrasition] = useTransition()
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')

  const bestStats = character?.bestStats
  const isActiveEdit = !!bestStats?.id

  const classEdit = isActiveEdit
    ? 'border-secondary-color'
    : 'border-transparent'

  const editStat = useEditStatStore((state) => state.isEditingStat)
  const updatedStat = useEditStatStore((state) => state.startEditingStat)

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterBestStatsSchema>>({
    resolver: zodResolver(CharacterBestStatsSchema),
    defaultValues: {
      circletStat: '',
      globetStat: '',
      sandStat: '',
      substatPriority: ''
    }
  })

  useEffect(() => {
    if (isActiveEdit) {
      setValue('sandStat', bestStats.sandStat)
      setValue('globetStat', bestStats.globetStat)
      setValue('circletStat', bestStats.circletStat)
      setValue('substatPriority', bestStats.substatPriority)
    }
  }, [isActiveEdit, setValue, bestStats])

  const onSubmit = handleSubmit((data) => {
    const characterId = character?.id!

    // Enviar datos al servidor para crear las estadísticas
    startTrasition(async () => {
      if (isActiveEdit) {
        const statId = bestStats.id
        const { status, message, error } = await updateBestStats(data, statId)

        if (status === 201) {
          reset()
          toast.success(message)
          updatedStat(false)
          mutate(`/api/characters/character?name=${characterName}`)
          return
        }

        toast.error(error)
        return
      }

      const { status, message, error } = await createBestStats(
        data,
        characterId
      )

      if (status === 201) {
        reset()
        toast.success(message)
        mutate(`/api/characters/character?name=${characterName}`)
        return
      }

      toast.error(error)
    })
  })

  if (!editStat && bestStats?.id) return null

  return (
    <form onSubmit={onSubmit} className='grid grid-cols-3 gap-4'>
      <Controller
        control={control}
        name='sandStat'
        render={({ field }) => (
          <Input
            isDisabled={isPending}
            label='Reloj'
            isInvalid={!!errors.sandStat}
            errorMessage={errors.sandStat?.message}
            className={`col-span-3 lg:col-span-1 rounded-xl border-2 ${classEdit}`}
            classNames={InputWrapper}
            placeholder='Recarga de Energía'
            size='lg'
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name='globetStat'
        render={({ field }) => (
          <Input
            isDisabled={isPending}
            label='Caliz'
            isInvalid={!!errors.globetStat}
            errorMessage={errors.globetStat?.message}
            className={`col-span-3 lg:col-span-1 rounded-xl border-2 ${classEdit}`}
            classNames={InputWrapper}
            placeholder='Bono daño Hydro'
            size='lg'
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name='circletStat'
        render={({ field }) => (
          <Input
            isDisabled={isPending}
            label='Tiara'
            isInvalid={!!errors.circletStat}
            errorMessage={errors.circletStat?.message}
            className={`col-span-3 lg:col-span-1 rounded-xl border-2 ${classEdit}`}
            classNames={InputWrapper}
            placeholder='Daño Crítico / Probabilidad Crítico'
            size='lg'
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name='substatPriority'
        render={({ field }) => (
          <Input
            isDisabled={isPending}
            label='Estadísticas secundarias'
            isInvalid={!!errors.substatPriority}
            errorMessage={errors.substatPriority?.message}
            className={`col-span-3 rounded-xl border-2 ${classEdit}`}
            classNames={InputWrapper}
            placeholder='Recarga de Energia > Daño Crít. / Prob. Crít. > Ataque Porcentual'
            size='lg'
            {...field}
          />
        )}
      />

      <Button
        size='lg'
        type='submit'
        color='success'
        isLoading={isPending}
        className='col-span-3 bg-color-light font-bold'
      >
        {isActiveEdit ? 'Editar' : 'Guardar'}
      </Button>
    </form>
  )
}

export default FormBestStat
