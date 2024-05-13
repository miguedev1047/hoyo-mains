export const getRarityColor = ({
  type: type,
  item: item
}: {
  type: 'gradient' | 'normal' | 'text'
  item: any
}) => {
  if (type === 'gradient') {
    switch (item.stars) {
      case 5:
        return 'bg-gradient-to-br to-yellow-500 from-yellow-600'
      case 4:
        return 'bg-gradient-to-br to-purple-500 from-purple-600'
      case 3:
        return 'bg-gradient-to-br to-blue-500 from-blue-600'
      case 2:
        return 'bg-gradient-to-br to-emerald-600 from-green-600'
      case 1:
        return 'bg-gradient-to-br to-gray-500 from-gray-600'
      default:
        return 'bg-gradient-to-br to-gray-500 from-gray-600'
    }
  }

  if (type === 'normal') {
    switch (item.stars) {
      case 5:
        return 'bg-yellow-500'
      case 4:
        return 'bg-purple-500'
      case 3:
        return 'bg-blue-500'
      case 2:
        return 'bg-green-500'
      case 1:
        return 'bg-gray-700'
      default:
        return 'bg-gray-700'
    }
  }

  if (type === 'text') {
    switch (item.stars) {
      case 5:
        return 'text-yellow-500'
      case 4:
        return 'text-purple-500'
      case 3:
        return 'text-blue-500'
      case 2:
        return 'text-green-500'
      case 1:
        return 'text-gray-700'
      default:
        return 'text-gray-700'
    }
  }

  return 'bg-gray-900'
}
