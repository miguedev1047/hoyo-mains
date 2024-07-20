
import Navigation from '@/render/src/shared/components/navigation'

interface BuildPageProps {
  searchParams: {
    character: string
    element: string
    stars: string
    weapon: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Builds',
    description:
      'Mira las mejores builds de los personajes de Genshin Impact. Encuentra la mejor build para tu personaje favorito.'
  }
}


const BuildPage = async ({ searchParams }: BuildPageProps) => {
  const { name, element, stars, weapon } = {
    name: searchParams.character?.toLowerCase(),
    element: searchParams.element?.toLowerCase(),
    stars: parseInt(searchParams?.stars!),
    weapon: searchParams.weapon?.toLowerCase()
  }

  return (
    <>
      <Navigation />
      <main className='max-w-[1280px] my-10 mx-auto'></main>
    </>
  )
}

export default BuildPage
