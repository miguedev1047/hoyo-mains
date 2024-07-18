import { fetchMaterials } from '@/render/src/panel/materials/utilities/services/fetch'
import { IconSquareRotated } from '@tabler/icons-react'
import { Material } from '@prisma/client'
import PanelWrapper from '@/render/components/UI/panel-wrapper'
import MaterialMenubar from '@/render/src/panel/materials/components/material-menubar'
import Materials from '@/render/src/panel/materials/materials'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import MaterialModal from '@/render/src/panel/materials/components/material-modal'

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
    <PanelWrapper>
      <PanelHeader
        title='Materiales'
        startContent={<IconSquareRotated size={32} />}
      />

      <MaterialMenubar />

      <Materials materials={materials} />

      <MaterialModal />
    </PanelWrapper>
  )
}

export default MaterialPage
