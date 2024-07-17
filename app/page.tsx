import { SearchParamsTypes } from '@/types'
import Header from '@/render/components/home/header/header'

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Inicio',
    description:
      'HoYo Mains es una comunidad de Genshin Impact en español. Aquí encontrarás guías, builds, y más sobre el juego.'
  }
}

export default async function Home({ searchParams }: SearchParamsTypes) {
  return (
    <>
      <Header />
      <main className='max-w-[1280px] my-10 mx-auto'>
       
      </main>
    </>
  )
}
