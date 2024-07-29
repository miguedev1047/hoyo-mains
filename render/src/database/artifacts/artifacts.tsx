import {
  BoxCard,
  BoxCardBody,
  BoxCardHeader,
  BoxCardTitle
} from '@//render/src/shared/components/box'
import { Artifact } from '@prisma/client'
import { Search } from '@/render/src/shared/components/search'
import ArtifactFilters from '@/render/src/database/artifacts/components/artifact-filters'
import ArtifactTable from '@/render/src/database/artifacts/components/artifact-table'

interface ArtifactsProps {
  artifacts: Artifact[]
}

const Artifacts = ({ artifacts }: ArtifactsProps) => {
  return (
    <BoxCard className='bg-color-dark p-4'>
      <BoxCardHeader>
        <BoxCardTitle className='text-base md:text-2xl font-bold'>
          Lista de Artefactos
        </BoxCardTitle>

        <Search
          label='Buscar artefacto'
          placeholder='Bruja carmesi...'
          searchQuery='name'
          className='w-full md:max-w-[375px]'
          variant='underlined'
        />

        <ArtifactFilters />
      </BoxCardHeader>
      <BoxCardBody>
        <ArtifactTable artifacts={artifacts} />
      </BoxCardBody>
    </BoxCard>
  )
}

export default Artifacts
