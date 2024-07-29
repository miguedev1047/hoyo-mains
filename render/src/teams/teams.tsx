import { BestTeamsType } from '@/render/src/types'
import { Hero } from '@/render/src/shared/components/hero'
import { HuTaoHeroBrand } from '@/assets/brands'
import TeamContainer from '@/render/src/teams/containers/team-container'

interface TeamsProps {
  teams: BestTeamsType[]
}

const Teams = ({ teams }: TeamsProps) => {
  return (
    <section className='space-y-4'>
      <Hero
        src={HuTaoHeroBrand.src}
        title='Equipos'
        description='Mira nuestra lista de los mejores equipos para Genshin Impact. Encuentra la mejor combinación de personajes para maximizar el potencial de tu equipo.'
      />
      <TeamContainer teams={teams} />
    </section>
  )
}

export default Teams
