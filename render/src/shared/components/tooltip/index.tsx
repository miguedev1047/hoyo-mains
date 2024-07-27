'use client'

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Tooltip as TooltipComponent
} from '@nextui-org/react'
import { Figure } from '@/render/src/shared/components/figure'
import { cn } from '@/libs/utils'
import Output from '@/render/src/shared/components/editor/output'

interface TooltipProps {
  item: any
  children: React.ReactNode
  className?: string
}

const Tooltip = ({ item, children, className }: TooltipProps) => {
  if (!item) return null

  return (
    <TooltipComponent
      placement='bottom'
      className={cn('bg-color-dark w-full max-w-[500px]', className)}
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
              <Output description={item?.description} />
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
