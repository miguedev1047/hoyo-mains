import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Tooltip as TooltipComponent
} from '@nextui-org/react'
import { Figure } from '@/render/src/shared/components/figure'
import parse from 'html-react-parser'

interface TooltipProps {
  item: any
  children: React.ReactNode
}

const Tooltip = ({ item, children }: TooltipProps) => {
  return (
    <TooltipComponent
      placement='bottom'
      className='bg-color-dark w-[500px]'
      content={
        <>
          <Card className='select-none pointer-events-none w-full border-transparent bg-transparent shadow-none rounded-none'>
            <CardHeader>
              <div className='flex items-center gap-4'>
                <Figure>
                  <Image
                    className='w-full h-full object-cover'
                    src={item?.imageUrl!}
                    alt={item?.name}
                  />
                </Figure>
                <h3 className='text-base font-bold line-clamp-1'>
                  {item?.name}
                </h3>
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
    </TooltipComponent>
  )
}

export default Tooltip
