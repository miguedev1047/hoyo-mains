export const tierColor = (tierName: string) => {
  switch (tierName) {
    case 'SS':
      return 'bg-[#E3696A]'
    case 'S':
      return 'bg-[#E5873A]'
    case 'A':
      return 'bg-[#E4BB17]'
    case 'B':
      return 'bg-[#46CB77]'
    case 'C':
      return 'bg-[#5A98E5]'
    default:
      return 'bg-[#6F6D95]'
  }
}
