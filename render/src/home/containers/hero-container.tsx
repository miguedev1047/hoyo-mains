import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Figure } from '@/render/src/shared/components/figure'
import { Image } from '@nextui-org/react'
import { HuTaoHeroBrand } from '@/assets/brands'

const HeroContainer = () => {
  return (
    <Card className='bg-color-dark p-4 select-none'>
      <CardHeader className='text-3xl font-semibold'>
        Guías definitiva para Genshin Impact
      </CardHeader>
      <CardBody>
        <div className='space-y-4 text-color-lightest'>
          <Figure
            className='bg-transparent h-36 relative'
            size='full'
            radius='xl'
          >
            <div className='absolute inset-0 size-full bg-black/50 z-50 grid place-content-center'>
              <h1 className='text-5xl font-bold uppercase'>¡Bienvenido!</h1>
            </div>
            <Image src={HuTaoHeroBrand.src} alt='Hu tao brand' />
          </Figure>
          <p className='text-lg text-pretty'>
            Explora a fondo todos los personajes de Genshin Impact con nuestra
            completa base de datos. Encuentra información detallada sobre
            habilidades, builds, y equipos para llevar tu experiencia de juego
            al siguiente nivel.
          </p>
        </div>
      </CardBody>
    </Card>
  )
}

export default HeroContainer
