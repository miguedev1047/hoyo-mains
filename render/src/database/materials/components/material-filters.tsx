import {
  Filter,
  FilterContent,
  FilterItem
} from '@/render/src/shared/components/filter'
import { Toggle } from '@/render/src/shared/components/toggle'
import { buttonFilters } from '@/render/src/shared/constants'
import { Image } from '@nextui-org/react'

const MaterialFilters = () => {
  return (
    <Filter>
      <FilterContent className='bg-color-light'>
        <FilterItem>
          {buttonFilters.rarity.map((filter) => (
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

export default MaterialFilters
