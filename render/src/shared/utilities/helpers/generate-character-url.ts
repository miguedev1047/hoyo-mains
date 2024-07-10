interface CharacterUrlProps {
  name: string
}
export function generateCharacterUrl(item: CharacterUrlProps) {
  if (!item.name) return ''

  const characterName = item.name.toLowerCase().replace(/\s/g, '-')
  const url = `/panel/character?name=${characterName}`
  return url
}
