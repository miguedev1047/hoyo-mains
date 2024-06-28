import { Character } from '@prisma/client'

interface Filters {
  searchValue: string
  element: string | undefined
  weapon: string | undefined
}

interface HomeFilters {
  searchValue: string
  element: string | undefined
  weapon: string | undefined
  rarity: number
}

export const filterCharacters = (
  filters: Filters,
  characters: Array<any> | undefined
) => {
  if (!characters && !filters) return undefined

  const filtered = characters?.filter((char) => {
    const matchesElement =
      filters.element === undefined || filters.element === char.element
    const matchesWeapon =
      filters.weapon === undefined || filters.weapon === char.weapon
    const matchesSearchValue = char.name
      .toLowerCase()
      .includes(filters.searchValue.toLowerCase())

    return matchesElement && matchesSearchValue && matchesWeapon
  })

  return filtered
}

export const homeFilterCharacter = (
  filters: HomeFilters,
  characters: Character[] | undefined
) => {
  if (!characters && !filters) return undefined

  const filtered = characters?.filter((char) => {
    if (!char) return

    const matchesElement =
      filters.element === '' || filters.element === char.element
    const matchesWeapon =
      filters.weapon === '' || filters.weapon === char.weapon
    const matchesRarity = filters.rarity === 0 || filters.rarity === char.stars
    const matchesSearchValue = char.name
      .toLowerCase()
      .includes(filters.searchValue.toLowerCase())

    return (
      matchesElement && matchesSearchValue && matchesWeapon && matchesRarity
    )
  })

  return filtered
}
