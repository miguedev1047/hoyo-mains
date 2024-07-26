import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Artifact } from '@prisma/client'
import { Search } from '@/render/src/shared/components/search'
import ArtifactFilters from '@/render/src/database/artifacts/components/artifact-filters'
import ArtifactTable from '@/render/src/database/artifacts/components/artifact-table'

interface ArtifactsProps {
  artifacts: Artifact[]
}

const Artifacts = ({ artifacts }: ArtifactsProps) => {
  return (
    <Card className='bg-color-dark p-4'>
      <CardHeader>
        <div className='w-full space-y-5'>
          <div className='w-full flex flex-wrap gap-4 justify-between items-center'>
            <h2 className='text-base md:text-2xl font-bold'>
              Lista de Artefactos
            </h2>

            <Search
              label='Buscar artefacto'
              placeholder='Bruja carmesi...'
              searchQuery='name'
              className='w-full md:max-w-[375px]'
              variant='underlined'
            />
          </div>

          <ArtifactFilters />
        </div>
      </CardHeader>
      <CardBody>
        <ArtifactTable artifacts={artifacts} />
      </CardBody>
    </Card>
  )
}

export default Artifacts
