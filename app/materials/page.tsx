import { fetchMaterials } from '@/render/src/database/materials/utilities/services/fetch'
import { Material } from '@prisma/client'
import RootContainer from '@/render/src/shared/components/containers/root-container'
import Materials from '@/render/src/database/materials/materials'

interface MaterialPageProps {
  searchParams: {
    stars: string
    name: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Materiales',
    description:
      'HoYo Mains es una comunidad de Genshin Impact en español. Aquí encontrarás guías, builds, y más sobre el juego.'
  }
}

const MaterialPage = async ({ searchParams }: MaterialPageProps) => {
  const { name, stars } = {
    name: searchParams?.name,
    stars: parseInt(searchParams?.stars)
  }

  const materials = (await fetchMaterials({ name, stars })) as Material[]

  return (
    <RootContainer>
      <Materials materials={materials} />
    </RootContainer>
  )
}

export default MaterialPage
