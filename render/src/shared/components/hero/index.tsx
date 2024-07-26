import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Figure } from '@/render/src/shared/components/figure'
import { Image } from '@nextui-org/react'

interface HeroProps {
  description: string
  src: string
  mainTitle: string
  title: string
}

export const Hero = ({ description, src, mainTitle, title }: HeroProps) => {
  return (
    <Card className='bg-color-dark p-4 select-none'>
      <CardHeader className='text-3xl font-semibold'>{title}</CardHeader>
      <CardBody>
        <div className='space-y-4 text-color-lightest'>
          <Figure
            className='bg-transparent h-36 relative'
            size='full'
            radius='xl'
          >
            <div className='absolute inset-0 size-full bg-black/50 z-50 grid place-content-center'>
              <h1 className='text-5xl font-bold uppercase'>{mainTitle}</h1>
            </div>
            <Image src={src} alt='Hu tao brand' />
          </Figure>
          <p className='text-lg text-pretty'>{description}</p>
        </div>
      </CardBody>
    </Card>
  )
}
