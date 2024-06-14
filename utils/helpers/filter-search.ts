export const filterSearch = (
  searchValue: string,
  filter: Array<any> | undefined
) => {
  return filter?.filter((weapon) =>
    weapon.name.toLowerCase().includes(searchValue.toLowerCase())
  )
}
