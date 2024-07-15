import { z } from 'zod'
import { CharacterType } from '@/render/src/types'
import { useEffect, useTransition } from 'react'
import { useEditStatStore } from '@/render/src/panel/character/best-stats/utilities/store/use-edit-stat-store'
import { CharacterBestStatsSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateBestStat } from '@/render/src/panel/character/best-stats/utilities/services/update'
import { createBestStat } from '@/render/src/panel/character/best-stats/utilities/services/create'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface BestStatsFormProps {
  character: CharacterType
}

export const useBestStatsForm = ({ character }: BestStatsFormProps) => {
  const [isPending, startTrasition] = useTransition()
  const { refresh } = useRouter()

  const bestStats = character?.bestStats
  const isActiveEdit = !!bestStats?.id
  const bestStatId = bestStats?.id

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
        const { status, message, error } = await updateBestStat(data, statId)

        if (status === 201) {
          reset()
          refresh()
          toast.success(message)
          updatedStat(false)
          return
        }

        toast.error(error)
        return
      }

      const { status, message, error } = await createBestStat(data, characterId)

      if (status === 201) {
        reset()
        refresh()
        toast.success(message)
        return
      }

      toast.error(error)
    })
  })

  return {
    control,
    errors,
    isPending,
    classEdit,
    editStat,
    bestStatId,
    isActiveEdit,
    onSubmit
  }
}
