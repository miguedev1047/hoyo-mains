import { CharacterType } from '@/render/src/types'
import { Hero } from '@/render/src/shared/components/hero'
import { HuTaoHeroBrand } from '@/assets/brands'
import BuildContainer from '@/render/src/builds/containers/build-container'

interface BuildsProps {
  builds: CharacterType[]
}

const Builds = ({ builds }: BuildsProps) => {
  return (
    <div className='space-y-4'>
      <Hero
        src={HuTaoHeroBrand.src}
        mainTitle='Builds'
        title='Lista general de builds'
        description='Aprende a construir a tus personajes favoritos con nuestra lista de builds. Encuentra la mejor combinación de artefactos, armas y talentos para maximizar el potencial de tu personaje.'
      />

      <BuildContainer builds={builds} />
    </div>
  )
}

export default Builds
