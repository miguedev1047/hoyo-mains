'use client'

import {
  Filter,
  FilterContent,
  FilterItem
} from '@/render/src/shared/components/filter'
import { Image } from '@nextui-org/react'
import { buttonFilters } from '@/render/src/shared/constants'
import { Toggle } from '@/render/src/shared/components/toggle'

const ArtifactFilters = () => {
  return (
    <Filter>
      <FilterContent className='bg-color-light grid lg:grid-cols-1'>
        <FilterItem>
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
        </FilterItem>
      </FilterContent>
    </Filter>
  )
}

export default ArtifactFilters
