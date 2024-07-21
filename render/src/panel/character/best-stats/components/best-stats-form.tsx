'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Controller } from 'react-hook-form'
import { IconDeviceFloppy, IconPencil } from '@tabler/icons-react'
import { InputWrapperDarkest } from '@/render/src/shared/utilities/classes'
import { CharacterType } from '@/render/src/types'
import { useBestStatsForm } from '@/render/src/panel/character/best-stats/utilities/hooks/use-best-stats-form'

interface BestStatsFormProps {
  character: CharacterType
}

const BestStatsForm = ({ character }: BestStatsFormProps) => {
  const {
    isPending,
    bestStatId,
    control,
    editStat,
    errors,
    isActiveEdit,
    onSubmit
  } = useBestStatsForm({ character })

  if (!editStat && bestStatId) return null

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
            className={`col-span-3 lg:col-span-1 rounded-xl border-2`}
            classNames={InputWrapperDarkest}
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
            className={`col-span-3 lg:col-span-1 rounded-xl border-2`}
            classNames={InputWrapperDarkest}
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
            className={`col-span-3 lg:col-span-1 rounded-xl border-2`}
            classNames={InputWrapperDarkest}
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
            className={`col-span-3 rounded-xl border-2`}
            classNames={InputWrapperDarkest}
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
        startContent={isActiveEdit ? <IconPencil /> : <IconDeviceFloppy />}
        isLoading={isPending}
        className='col-span-3 bg-color-light font-bold'
      >
        {isActiveEdit ? 'Editar' : 'Guardar'}
      </Button>
    </form>
  )
}

export default BestStatsForm
