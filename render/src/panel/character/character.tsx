import { CharacterType } from '@/render/src/types'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/react'
import { redirect } from 'next/navigation'
import InfoHeader from '@/render/src/panel/character/info-header'
import Configuration from '@/render/src/panel/character/configuration/configuration'
import Ascension from '@/render/src/panel/character/ascension/ascension'
import Materials from '@/render/src/panel/character/materials/materials'
import Weapons from '@/render/src/panel/character/weapons/weapons'
import Artifacts from './artifacts/artifacts'

interface CharacterProps {
  character: CharacterType
}

const Character = ({ character }: CharacterProps) => {
  if (!character) return redirect('/panel/characters')

  return (
    <Card className='dark:bg-color-dark/50 py-4 px-1 sm:px-4 md:px-8'>
      <CardHeader>
        <InfoHeader character={character} />
      </CardHeader>
      <Divider />
      <CardBody className='grid grid-cols-4 px-0 md:px-4 gap-10'>
        <Configuration character={character} />
        <Divider className='col-span-4' />
        <Ascension character={character} />
        <Divider className='col-span-4' />
        <Materials character={character} />
        <Divider className='col-span-4' />
        <Weapons character={character} />
        <Divider className='col-span-4 lg:hidden' />
        <Artifacts character={character} />
        <Divider className='col-span-4' />
      </CardBody>
    </Card>
  )
}

export default Character
