export const getStarBorderColor = (stars: number) => {
  const starColors = {
    5: 'border-yellow-500',
    4: 'border-purple-500',
    3: 'border-blue-500',
    2: 'border-green-500',
    1: 'border-gray-500'
  }

  const defaultBorderColor = 'border-gray-500'

  return starColors[stars as keyof typeof starColors] || defaultBorderColor
}
