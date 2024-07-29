'use client'

import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { buttonFilters } from '@/render/src/shared/constants'
import { Toggle } from '@/render/src/shared/components/toggle'

const ArtifactFilters = () => {
  return (
    <div className='w-full'>
      <Card className='bg-color-light p-4 flex flex-wrap gap-16 justify-center flex-row'>
        <div className='flex flex-wrap justify-center gap-2'>
          {buttonFilters.rarity.slice(0, 3).map((filter) => (
            <Toggle
              name='stars'
              value={filter.value}
              key={filter.value}
              content={<p>{filter.name}</p>}
            >
              <Image
                className='object-cover w-full h-full'
                src={filter.src}
                alt={`${filter.name} Img`}
              />
            </Toggle>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default ArtifactFilters