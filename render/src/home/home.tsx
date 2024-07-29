import { CharacterType } from '@/render/src/types'
import { Hero } from '@/render/src/shared/components/hero'
import { HuTaoHeroBrand } from '@/assets/brands'
import CharacterContainer from '@/render/src/home/containers/character-container'

interface HomeProps {
  characters: CharacterType[]
}

const Home = ({ characters }: HomeProps) => {
  return (
    <section className='space-y-4'>
      <Hero
        title='ESTA EN BETA CAREMONDA'
        description='Hey perro malparido soplamonda esta monda esta en beta, si usted no entiende una monda es porque esta en beta esta porqueria, si hay errores es porque el que programa esta vaina de vaina sabe sumar, muchas gracias por su atención.'
      />
      <Hero
        src={HuTaoHeroBrand.src}
        title='¡Bienvenido! Caremonda'
        description='Explora a fondo todos los personajes de Genshin Impact. Encuentra información detallada sobre habilidades, builds, y equipos para llevar tu experiencia de juego al siguiente nivel.'
      />
      <CharacterContainer characters={characters} />
    </section>
  )
}

export default Home
