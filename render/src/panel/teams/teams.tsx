'use client'

import { BestTeamsType, CharacterType } from '@/render/src/types'
import SortableTeamList from '@/render/src/panel/teams/components/sortable-team-list'

interface TeamsProps {
  teams: BestTeamsType[]
  characters: CharacterType[]
}

const Teams = ({ teams, characters }: TeamsProps) => {
  return <SortableTeamList teams={teams} characters={characters} />
}

export default Teams
