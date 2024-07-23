import { Card, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Figure } from '@/render/src/shared/components/figure'
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
    <li key={item.title}>
      <Link href={item.url}>
        <Card
          isPressable
          isBlurred
          isFooterBlurred
          className='w-full aspect-square bg-color-dark'
        >
          <Figure className='bg-transparent w-full h-full'>
            <Image
              className='object-cover w-full h-full'
              classNames={{
                wrapper: 'w-full h-full aspect-square object-cover'
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
