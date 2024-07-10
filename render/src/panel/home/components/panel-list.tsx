import { homeItems } from '@/constants'
import PanelItem from '@/render/src/panel/home/components/panel-item'

const PanelList = () => {
  return (
    <ol className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4'>
      {homeItems.map((item) => (
        <PanelItem key={item.title} item={item} />
      ))}
    </ol>
  )
}

export default PanelList
