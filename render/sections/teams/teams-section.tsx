'use client'

import { TeamProps } from '@/types'
import GeneralTeamList from '@/render/components/panel/teams/general-teams/general-team-list'

interface TeamsSectionProps {
  teams: TeamProps[]
  characters: any
}

const TeamsSection = ({ teams, characters }: TeamsSectionProps) => {
  return (
    <section>
      <GeneralTeamList characters={characters} teams={teams} />
    </section>
  )
}

export default TeamsSection
