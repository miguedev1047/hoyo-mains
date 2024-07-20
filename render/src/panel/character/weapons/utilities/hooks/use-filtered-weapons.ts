import { CharacterType } from '@/render/src/types'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Weapon } from '@prisma/client'

interface FilteredWeaponsProps {
  character: CharacterType
}

export const useFilteredWeapons = ({ character }: FilteredWeaponsProps) => {
  const { data, isLoading, error } = useFetch<Weapon[]>('/api/weapons')

  const weapons = data?.filter(
    (item) =>
      item.type.toLocaleLowerCase() === character?.weapon.toLocaleLowerCase()
  )

  return {
    weapons,
    isLoading,
    error
  }
}
