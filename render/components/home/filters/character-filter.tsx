'use client'

import {
  Anemo,
  Bow,
  Catalyst,
  Claymore,
  Cryo,
  Dendro,
  Electro,
  Geo,
  Hydro,
  Polearm,
  Pyro,
  Rarity4,
  Rarity5,
  Sword
} from '@/assets'
import { useFilterStore } from '@/utils/store/use-filter'
import { Button } from '@nextui-org/button'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
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
          <Button
            onPress={() => handleChange('rarity', '4')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', rarity === 4 && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Rarity4.src}
              alt='4 Star Image'
            />
          </Button>
          <Button
            onPress={() => handleChange('rarity', '5')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', rarity === 5 && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Rarity5.src}
              alt='5 Star Image'
            />
          </Button>
        </div>

        <div className='space-x-2'>
          <Button
            onPress={() => handleChange('element', 'anemo')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', element === 'anemo' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Anemo.src}
              alt='Anemo Image'
            />
          </Button>
          <Button
            onPress={() => handleChange('element', 'cryo')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', element === 'cryo' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Cryo.src}
              alt='Cryo Image'
            />
          </Button>
          <Button
            onPress={() => handleChange('element', 'electro')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', element === 'electro' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Electro.src}
              alt='Electro Image'
            />
          </Button>
          <Button
            onPress={() => handleChange('element', 'dendro')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', element === 'dendro' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Dendro.src}
              alt='Dendro Image'
            />
          </Button>
          <Button
            onPress={() => handleChange('element', 'geo')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', element === 'geo' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Geo.src}
              alt='Geo Image'
            />
          </Button>
          <Button
            onPress={() => handleChange('element', 'hydro')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', element === 'hydro' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Hydro.src}
              alt='Hydro Image'
            />
          </Button>
          <Button
            onPress={() => handleChange('element', 'pyro')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', element === 'pyro' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Pyro.src}
              alt='Pyro Image'
            />
          </Button>
        </div>

        <div className='space-x-2'>
          <Button
            onPress={() => handleChange('weapon', 'bow')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', weapon === 'bow' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Bow.src}
              alt='Bow Image'
            />
          </Button>
          <Button
            onPress={() => handleChange('weapon', 'catalyst')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', weapon === 'catalyst' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Catalyst.src}
              alt='Catalyst Image'
            />
          </Button>
          <Button
            onPress={() => handleChange('weapon', 'claymore')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', weapon === 'claymore' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Claymore.src}
              alt='Claymore Image'
            />
          </Button>
          <Button
            onPress={() => handleChange('weapon', 'polearm')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', weapon === 'polearm' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Polearm.src}
              alt='Polearm Image'
            />
          </Button>
          <Button
            onPress={() => handleChange('weapon', 'sword')}
            size='lg'
            isIconOnly
            className={clsx('p-1.5', weapon === 'sword' && 'bg-color-dark')}
          >
            <Image
              className='object-cover w-full h-full'
              src={Sword.src}
              alt='Sword Image'
            />
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CharacterFilter
