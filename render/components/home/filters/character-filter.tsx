'use client'

import { buttonFilters } from '@/constants'
import { useFilterStore } from '@/utils/store/use-filter'
import { Button } from '@nextui-org/button'
import { Card } from '@nextui-org/card'
import { Image, Tooltip } from '@nextui-org/react'
import clsx from 'clsx'

const CharacterFilter = () => {
  const { rarity, element, weapon } = useFilterStore((state) => ({
    rarity: state.rarity,
    element: state.element,
    weapon: state.weapon
  }))

  const { setElement, setRarity, setWeapon } = useFilterStore((state) => ({
    setRarity: state.setRarity,
    setElement: state.setElement,
    setWeapon: state.setWeapon
  }))

  const handleChange = (prop: string, data: string) => {
    switch (prop) {
      case 'rarity':
        const parsedRarity = parseInt(data)
        if (parsedRarity === rarity) return setRarity(0)
        return setRarity(parsedRarity)
      case 'element':
        if (element === data) return setElement('')
        return setElement(data)
      case 'weapon':
        if (weapon === data) return setWeapon('')
        return setWeapon(data)
      default:
        break
    }
  }

  return (
    <div className='w-full'>
      <Card className='bg-color-light p-4 flex justify-around flex-row'>
        <div className='space-x-2'>
          {buttonFilters.rarity.map((rarityFilter) => (
            <Tooltip
              key={rarityFilter.value}
              className='bg-color-dark text-color-light'
              content={<p>{rarityFilter.name}</p>}
              placement='bottom'
            >
              <Button
                onPress={() => handleChange('rarity', rarityFilter.value)}
                size='lg'
                isIconOnly
                className={clsx(
                  'p-1.5',
                  rarity === parseInt(rarityFilter.value) && 'bg-color-dark'
                )}
              >
                <Image
                  className='object-cover w-full h-full'
                  src={rarityFilter.src}
                  alt={`${rarityFilter.name} Img`}
                />
              </Button>
            </Tooltip>
          ))}
        </div>

        <div className='space-x-2'>
          {buttonFilters.elements.map((filterElement) => (
            <Tooltip
              key={filterElement.value}
              className='bg-color-dark text-color-light'
              content={<p>{filterElement.name}</p>}
              placement='bottom'
            >
              <Button
                onPress={() => handleChange('element', filterElement.value)}
                size='lg'
                isIconOnly
                className={clsx(
                  'p-1.5',
                  element === filterElement.value && 'bg-color-dark'
                )}
              >
                <Image
                  className='object-cover w-full h-full'
                  src={filterElement.src}
                  alt={`${filterElement.name} Img`}
                />
              </Button>
            </Tooltip>
          ))}
        </div>

        <div className='space-x-2'>
          {buttonFilters.weapons.map((filterWeapon) => (
            <Tooltip
              key={filterWeapon.value}
              className='bg-color-dark text-color-light'
              content={<p>{filterWeapon.name}</p>}
              placement='bottom'
            >
              <Button
                onPress={() => handleChange('weapon', filterWeapon.value)}
                size='lg'
                isIconOnly
                className={clsx(
                  'p-1.5',
                  weapon === filterWeapon.value && 'bg-color-dark'
                )}
              >
                <Image
                  className='object-cover w-full h-full'
                  src={filterWeapon.src}
                  alt={`${filterWeapon.name} Img`}
                />
              </Button>
            </Tooltip>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default CharacterFilter
