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
    }
  ]
}

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <nav>
      <Card className='w-[250px] hidden lg:block h-[calc(100vh_-_4rem)] sticky top-8  bg-color-dark z-50'>
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
    </nav>
  )
}

export default Sidebar
