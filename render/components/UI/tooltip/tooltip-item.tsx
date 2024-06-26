import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Tooltip
} from '@nextui-org/react'
import parse from 'html-react-parser'

interface TooltipItemProps {
  children: React.ReactNode
  item: Item | undefined
}

interface Item {
  imageUrl: string | null
  name: string
  description: string
}

const TooltipItem = ({ children, item }: TooltipItemProps) => {
  return (
    <Tooltip
      placement='bottom'
      className='bg-color-dark w-[500px]'
      content={
        <>
          <Card className='select-none pointer-events-none w-full border-transparent bg-transparent shadow-none rounded-none'>
            <CardHeader>
              <div className='flex items-center gap-4'>
                <figure className='bg-primary-color w-12 h-12 relative p-1 rounded-xl overflow-hidden flex-none'>
                  <Image src={item?.imageUrl!} alt={item?.name} />
                </figure>
                <h3 className='text-base font-bold line-clamp-1'>{item?.name}</h3>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className='leading-8 text-sm text-pretty text-color-light output-text'>
                {parse(item?.description!)}
              </div>
            </CardBody>
          </Card>
        </>
      }
    >
      {children}
    </Tooltip>
  )
}

export default TooltipItem
