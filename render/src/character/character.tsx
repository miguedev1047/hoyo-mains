import { CharacterType } from '@/render/src/types'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/react'
import { redirect } from 'next/navigation'
import InfoHeader from '@/render/src/character/components/info-header'
import Ascension from '@/render/src/character/components/ascension/ascension'
import Weapons from '@/render/src/character/components/weapons/weapons'
import Artifacts from '@/render/src/character/components/artifacts/artifacts'
import BestStats from '@/render/src/character/components/best-stats/best-stats'
import Video from '@/render/src/character/components/video/video'

interface CharacterProps {
  character: CharacterType
}

const Character = ({ character }: CharacterProps) => {
  if (!character) return redirect('/')

  return (
    <Card className='dark:bg-color-dark/50 p-1 md:p-4 space-y-4'>
      <CardHeader>
        <InfoHeader character={character} />
      </CardHeader>
      <CardBody className='grid grid-cols-4 px-0 md:px-4 gap-10'>
        <Divider className='col-span-4' />
        <Ascension character={character} />
        <Divider className='col-span-4' />
        <Weapons character={character} />
        <Divider className='col-span-4 lg:hidden' />
        <Artifacts character={character} />
        <Divider className='col-span-4' />
        <BestStats character={character} />
        <Divider className='col-span-4' />
        <Video character={character} />
        <Divider className='col-span-4' />
        <Divider className='col-span-4' />
      </CardBody>
    </Card>
  )
}

export default Character
