import { buttonFilters } from '@/constants'
import { Toggle } from '@/render/components/UI/toggle'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'

const CharacterFilter = () => {
  return (
    <div className='w-full'>
      <Card className='bg-color-light p-4 flex flex-wrap gap-4 justify-around flex-row'>
        <div className='flex flex-wrap justify-center gap-2'>
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
        </div>

        <div className='flex flex-wrap justify-center gap-2'>
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

        <div className='flex flex-wrap justify-center gap-2'>
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

export default CharacterFilter
