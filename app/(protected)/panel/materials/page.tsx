import { fetchMaterials } from '@/render/src/panel/materials/utilities/services/fetch'
import { IconSquareRotated } from '@tabler/icons-react'
import { Material } from '@prisma/client'
import MaterialMenubar from '@/render/src/panel/materials/components/material-menubar'
import Materials from '@/render/src/panel/materials/materials'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import MaterialSheet from '@/render/src/panel/materials/components/material-sheet'
import PanelContainer from '@/render/src/shared/components/containers/panel-container'

interface MaterialPageProps {
  searchParams: {
    name: string
    type: string
    stars: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Materiales',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const MaterialPage = async ({ searchParams }: MaterialPageProps) => {
  const { name, stars, type } = {
    name: searchParams.name,
    type: searchParams.type,
    stars: parseInt(searchParams.stars)
  }

  const materials = (await fetchMaterials({ name, type, stars })) as Material[]

  return (
    <PanelContainer>
      <PanelHeader
        title='Materiales'
        startContent={<IconSquareRotated size={32} />}
      />

      <MaterialMenubar />

      <Materials materials={materials} />

      <MaterialSheet />
    </PanelContainer>
  )
}

export default MaterialPage
