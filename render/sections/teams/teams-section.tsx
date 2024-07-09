'use client'

import { BestTeamType } from '@/types'
import BestTeamList from '@/render/components/panel/teams/best-teams/best-team-list'
import TeamNav from '@/render/components/panel/teams/best-teams/team-nav'

interface TeamsSectionProps {
  teams: BestTeamType[]
  characters: any
}

const BestTeamSection = ({ teams, characters }: TeamsSectionProps) => {
  return (
    <section className='space-y-4'>
      <TeamNav />
      <BestTeamList characters={characters} teams={teams} />
    </section>
  )
}

export default BestTeamSection
