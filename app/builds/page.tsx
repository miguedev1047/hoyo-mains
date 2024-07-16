import { SearchParamsTypes } from '@/types'
import Header from '@/render/components/home/header/header'

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Builds',
    description:
      'Mira las mejores builds de los personajes de Genshin Impact. Encuentra la mejor build para tu personaje favorito.'
  }
}

const BuildPage = async ({ searchParams }: SearchParamsTypes) => {
  const { name, element, stars, weapon } = {
    name: searchParams.character?.toLowerCase(),
    element: searchParams.element?.toLowerCase(),
    stars: parseInt(searchParams?.stars!),
    weapon: searchParams.weapon?.toLowerCase()
  }


  return (
    <>
      <Header />
      <main className='max-w-[1280px] my-10 mx-auto'>
       
      </main>
    </>
  )
}

export default BuildPage
