import { Artifact } from '@prisma/client'
import ArtifactList from '@/render/src/panel/artifacts/components/artifact-list'

interface ArtifactsProps {
  artifacts: Artifact[]
}

const Artifacts = ({ artifacts }: ArtifactsProps) => {
  return <ArtifactList artifacts={artifacts} />
}

export default Artifacts
