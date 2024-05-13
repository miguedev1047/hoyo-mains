'use client'

import {
  IconBooks,
  IconHome,
  IconHourglassEmpty,
  IconSquareRotated,
  IconSword,
  IconUsers
} from '@tabler/icons-react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { usePathname } from 'next/navigation'

const navInfo = {
  title: 'HoYo Mains',
  items: [
    {
      href: '/panel',
      icon: <IconHome />,
      title: 'Inicio'
    },
    {
      href: '/panel/characters',
      icon: <IconUsers />,
      title: 'Personajes'
    },
    {
      href: '/panel/weapons',
      icon: <IconSword />,
      title: 'Armas'
    },
    {
      href: '/panel/artifacts',
      icon: <IconHourglassEmpty />,
      title: 'Artefactos'
    },
    {
      href: '/panel/materials',
      icon: <IconSquareRotated />,
      title: 'Materiales'
    },
    {
      href: '/panel/talents',
      icon: <IconBooks />,
      title: 'Talentos'
    }
  ]
}

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <Card as={'nav'} className='w-60 h-full bg-color-dark'>
      <CardHeader>
        <h1 className='text-2xl font-bold mx-auto'>{navInfo.title}</h1>
      </CardHeader>

      <CardBody>
        <Listbox aria-label='Panel Dashboard'>
          {navInfo.items.map((item, index) => (
            <ListboxItem
              key={index}
              href={item.href}
              textValue={item.title}
              startContent={item.icon}
              className={`text-color-gray ${
                pathname === item.href
                  ? 'bg-primary-color'
                  : 'hover:bg-color-primary'
              }`}
            >
              <span className='ml-2'>{item.title}</span>
            </ListboxItem>
          ))}
        </Listbox>
      </CardBody>
    </Card>
  )
}

export default Sidebar
