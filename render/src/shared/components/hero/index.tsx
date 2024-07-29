import { Figure } from '@/render/src/shared/components/figure'
import { Image } from '@nextui-org/react'
import { BoxCard, BoxCardBody } from '@/render/src/shared/components/box'

interface HeroProps {
  description: string
  src: string
  title: string
}

export const Hero = ({ description, src, title }: HeroProps) => {
  return (
    <BoxCard className='bg-color-dark'>
      <BoxCardBody>
        <div className='space-y-4 text-color-lightest max-md:rounded-md'>
          <Figure className='bg-transparent h-36 relative' size='full'>
            <div className='absolute inset-0 size-full bg-black/50 z-20 grid place-content-center'>
              <h1 className='text-xl md:text-5xl font-bold uppercase'>
                {title}
              </h1>
            </div>
            <Image className='rounded-none' src={src} alt='Hu tao brand' />
          </Figure>
          <p className='text-xs sm:text-sm md:text-lg text-pretty'>
            {description}
          </p>
        </div>
      </BoxCardBody>
    </BoxCard>
  )
}
