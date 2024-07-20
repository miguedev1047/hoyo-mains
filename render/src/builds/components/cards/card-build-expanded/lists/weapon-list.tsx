import { CharacterType } from '@/render/src/types'
import React from 'react'
import WeaponItem from '../items/weapon-item'

interface WeaponListProps {
  build: CharacterType
}

const WeaponList = ({ build }: WeaponListProps) => {
  const weapons = build.weapons

  return (
    <ol className='space-y-2'>
      {weapons.map((weapon) => (
        <WeaponItem key={weapon.id} weapon={weapon} />
      ))}
    </ol>
  )
}

export default WeaponList
