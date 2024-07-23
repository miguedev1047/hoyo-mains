import { CharacterType } from '@/render/src/types'
import CharacterContainer from '@/render/src/home/containers/character-container'
import HeroContainer from '@/render/src/home/containers/hero-container'

interface HomeProps {
  characters: CharacterType[]
}

const Home = ({ characters }: HomeProps) => {
  return (
    <div className='space-y-4'>
      <HeroContainer />
      <CharacterContainer characters={characters} />
    </div>
  )
}

export default Home
