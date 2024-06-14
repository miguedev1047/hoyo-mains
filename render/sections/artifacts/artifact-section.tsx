'use client'

import { Divider } from '@nextui-org/divider'
import { Input } from '@nextui-org/input'
import { useState } from 'react'
import { InputWrapper } from '@/utils/classes'
import { IconSearch } from '@tabler/icons-react'
import ArtifactList from '@/render/components/panel/artifacts/list-artifact'

const ArtifactSection = () => {
  const [searchValue, setSearchedArtifact] = useState('')

  return (
    <section className='space-y-4'>
      <Divider />
      <nav>
        <Input
          size='md'
          label='Buscar artfefacto'
          classNames={InputWrapper}
          className='col-span-4'
          startContent={<IconSearch />}
          placeholder='Escribe el nombre del artefacto...'
          value={searchValue}
          onValueChange={setSearchedArtifact}
        />
      </nav>
      <Divider />

      <ArtifactList searchValue={searchValue} />
    </section>
  )
}

export default ArtifactSection
