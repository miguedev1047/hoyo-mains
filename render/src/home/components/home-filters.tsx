'use client'

import {
  Filter,
  FilterContent,
  FilterItem
} from '@/render/src/shared/components/filter'
import { Divider, Image } from '@nextui-org/react'
import { buttonFilters } from '@/render/src/shared/constants'
import { Toggle } from '@/render/src/shared/components/toggle'

const HomeFilters = () => {
  return (
    <Filter>
      <FilterContent>
        <FilterItem>
          {buttonFilters.rarity.slice(0, 2).map((filter) => (
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
        <Divider className='block lg:hidden col-span-1 lg:col-span-3 bg-gray-400 my-2' />
        <FilterItem>
          {buttonFilters.elements.map((filter) => (
            <Toggle
              name='element'
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
        <Divider className='block lg:hidden col-span-1 lg:col-span-3 bg-gray-400 my-2' />
        <FilterItem>
          {buttonFilters.weapons.map((filter) => (
            <Toggle
              name='weapon'
              key={filter.name}
              value={filter.value}
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

export default HomeFilters
