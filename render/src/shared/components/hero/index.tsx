import { Figure } from '@/render/src/shared/components/figure'
import { BoxCard, BoxCardBody } from '@/render/src/shared/components/box'

interface HeroProps {
  description: string
  src?: string
  title: string
}

export const Hero = ({ description, src, title }: HeroProps) => {
  return (
    <BoxCard className='bg-color-dark'>
      <BoxCardBody>
        <div className='space-y-4 text-color-lightest max-md:rounded-md'>
          <Figure className='bg-transparent h-40 relative' size='full'>
            {src && (
              <div
                style={{
                  background: `url(${src})`,
                  backgroundAttachment: 'scroll',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                className='w-full h-full'
              />
            )}

            <div className='absolute inset-0 flex items-center justify-center z-[10] size-full bg-black/50'>
              <h1 className='text-xl md:text-5xl font-bold uppercase'>
                {title}
              </h1>
            </div>
          </Figure>
          <p className='text-xs sm:text-sm md:text-lg text-pretty'>
            {description}
          </p>
        </div>
      </BoxCardBody>
    </BoxCard>
  )
}
