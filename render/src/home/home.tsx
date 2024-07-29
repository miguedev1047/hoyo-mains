import { CharacterType } from '@/render/src/types'
import { Hero } from '@/render/src/shared/components/hero'
import { HuTaoHeroBrand } from '@/assets/brands'
import CharacterContainer from '@/render/src/home/containers/character-container'

interface HomeProps {
  characters: CharacterType[]
}

const Home = ({ characters }: HomeProps) => {
  return (
    <div className='space-y-4'>
      <Hero
        src={HuTaoHeroBrand.src}
        title='¡Bienvenido! Caremonda'
        description='Explora a fondo todos los personajes de Genshin Impact. Encuentra información detallada sobre habilidades, builds, y equipos para llevar tu experiencia de juego al siguiente nivel.'
      />
      <CharacterContainer characters={characters} />
    </div>
  )
}

export default Home
