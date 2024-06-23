import Header from '@/render/components/home/header/header'
import SectionCharacterHome from '@/render/sections/characters/character-home-section'

const CharacterPage = ({ searchParams }: any) => {
  const characterName = searchParams.name.replace(/-/g, ' ')

  return (
    <>
      <Header />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <SectionCharacterHome characterName={characterName} />
      </main>
    </>
  )
}

export default CharacterPage
