interface Filters {
  searchValue: string
  element: string | undefined
}

export const filterCharacters = (
  filters: Filters,
  characters: Array<any> | undefined
) => {
  if (!characters) return undefined

  const filtered = characters.filter((char) => {
    const matchesElement =
      filters.element === undefined || filters.element === char.element
    const matchesSearchValue = char.name
      .toLowerCase()
      .includes(filters.searchValue.toLowerCase())

    return matchesElement && matchesSearchValue
  })

  return filtered
}
