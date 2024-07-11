import { Card, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import Figure from '@/render/src/shared/components/figure'
import Link from 'next/link'
import Countup from '@/render/src/panel/home/components/countup'

interface PanelItemProps {
  item: {
    title: string
    url: string
    background: string
  }
}

const PanelItem = ({ item }: PanelItemProps) => {
  return (
    <li
      key={item.title}
      className='w-full h-[400px] flex-1 hover:flex-[5] transition-all duration-700 ease-in-beizer select-none'
    >
      <Link href={item.url}>
        <Card
          isPressable
          isBlurred
          isFooterBlurred
          className='w-full h-full bg-color-dark'
        >
          <Figure width='w-full' height='h-full'>
            <Image
              className='object-cover w-full h-full'
              classNames={{
                wrapper: 'aspect-square'
              }}
              src={item.background}
              alt={item.title}
            />
          </Figure>
          <CardFooter className='flex items-center justify-between bg-color-dark/75 border-color-dark/20 border-1 overflow-hidden py-1.5 px-4 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
            <h2 className='text-xl font-semibold line-clamp-1'>{item.title}</h2>

            <Countup url={item.url} />
          </CardFooter>
        </Card>
      </Link>
    </li>
  )
}

export default PanelItem
