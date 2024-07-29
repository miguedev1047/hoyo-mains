'use client'

import { Card } from '@nextui-org/card'
import { Divider, Image } from '@nextui-org/react'
import { buttonFilters } from '@/render/src/shared/constants'
import { Toggle } from '@/render/src/shared/components/toggle'

const HomeFilters = () => {
  return (
    <div className='w-full'>
      <Card className='bg-color-light p-1 md:p-4 grid grid-cols-1 lg:grid-cols-3 gap-2 max-md:rounded-md'>
        <div className='w-full flex flex-wrap justify-center gap-2'>
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
        </div>
        <Divider className='block lg:hidden col-span-1 lg:col-span-3 bg-gray-400 my-2' />
        <div className='w-full flex flex-wrap justify-center gap-2'>
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
        </div>
        <Divider className='block lg:hidden col-span-1 lg:col-span-3 bg-gray-400 my-2' />
        <div className='w-full flex flex-wrap justify-center gap-2'>
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
        </div>
      </Card>
    </div>
  )
}

export default HomeFilters
