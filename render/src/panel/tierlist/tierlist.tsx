import { TierlistType } from '@/render/src/types'

interface TierlistProps {
  tierlists: TierlistType[]
}

const Tierlist = ({ tierlists }: TierlistProps) => {
  return (
    <div>
      <h1>Tierlist</h1>
      {JSON.stringify(tierlists)}
    </div>
  )
}

export default Tierlist
