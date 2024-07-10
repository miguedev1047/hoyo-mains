export function getStarBorderColor(stars: number) {
  const starColors = {
    5: 'five-star',
    4: 'four-star',
    3: 'three-star',
    2: 'two-star',
    1: 'one-star'
  }

  const defaultBorderColor = 'default'

  return starColors[stars as keyof typeof starColors] || defaultBorderColor
}
