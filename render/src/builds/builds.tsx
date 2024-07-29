import { CharacterType } from '@/render/src/types'
import { Hero } from '@/render/src/shared/components/hero'
import { HuTaoHeroBrand } from '@/assets/brands'
import BuildContainer from '@/render/src/builds/containers/build-container'

interface BuildsProps {
  builds: CharacterType[]
}

const Builds = ({ builds }: BuildsProps) => {
  return (
    <section className='space-y-4'>
      <Hero
        src={HuTaoHeroBrand.src}
        title='Builds'
        description='Aprende a armar a tus personajes favoritos con nuestra lista de builds. Encuentra la mejor combinación de artefactos, armas y talentos para maximizar el potencial de tu personaje.'
      />
      <BuildContainer builds={builds} />
    </section>
  )
}

export default Builds
