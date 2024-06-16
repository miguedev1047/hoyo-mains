interface Filters {
  searchValue: string
  element: string | undefined
  weapon: string | undefined
}

export const filterCharacters = (
  filters: Filters,
  characters: Array<any> | undefined
) => {
  if (!characters) return undefined

  const filtered = characters.filter((char) => {
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
