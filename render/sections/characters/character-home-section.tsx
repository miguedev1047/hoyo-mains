import AlertError from '@/render/components/UI/errors/alert-error'
import CharacterArtifacts from '@/render/components/home/characters/artifacts/character-artifacts'
import CharacterHeader from '@/render/components/home/characters/character-header'
import CharacterMaterials from '@/render/components/home/characters/materials/character-materials'
import CharacterAscensionTable from '@/render/components/home/characters/table/character-ascension-table'
import CharacterWeapons from '@/render/components/home/characters/weapons/character-weapons'
import {
  characterType,
  dataCharacterByName
} from '@/render/services/home/characters/data'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/react'

const SectionCharacterHome = async ({
  characterName
}: {
  characterName: string
}) => {
  const character = (await dataCharacterByName(characterName)) as characterType

  if (!character)
    return (
      <AlertError
        className='h-[calc(100dvh_-_14rem)]'
        message='Hubo un problema al cargar el personaje.'
      />
    )

  return (
    <section className='my-8'>
      <Card className='dark:bg-color-dark/50 py-4 px-1 sm:px-4 md:px-8'>
        <CardHeader>
          <CharacterHeader character={character} />
        </CardHeader>
        <Divider />
        <CardBody className='grid grid-cols-4 px-0 md:px-4 gap-12'>
          <CharacterAscensionTable character={character} />
          <Divider className='col-span-4' />
          <CharacterMaterials character={character} />
          <Divider className='col-span-4' />
          <CharacterWeapons character={character} />
          <Divider className='col-span-4 lg:hidden' />
          <CharacterArtifacts character={character} />
        </CardBody>
      </Card>
    </section>
  )
}

export default SectionCharacterHome
