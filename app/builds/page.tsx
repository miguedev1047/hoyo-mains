import Header from '@/render/components/home/header/header'
import SectionBuild from '@/render/sections/builds/section-build'

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Builds',
    description:
      'Mira las mejores builds de los personajes de Genshin Impact. Encuentra la mejor build para tu personaje favorito.'
  }
}

const BuildPage = () => {
  return (
    <>
      <Header />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <SectionBuild />
      </main>
    </>
  )
}

export default BuildPage
