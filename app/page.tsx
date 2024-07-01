import Header from '@/render/components/home/header/header'
import SectionHome from '@/render/sections/home/section-home'

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Inicio',
    description:
      'HoYo Mains es una comunidad de Genshin Impact en español. Aquí encontrarás guías, builds, y más sobre el juego.'
  }
}

export default function Home() {
  return (
    <>
      <Header />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <SectionHome />
      </main>
    </>
  )
}
