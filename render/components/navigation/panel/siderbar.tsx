'use client'

import {
  IconHome,
  IconHourglassEmpty,
  IconLayoutSidebar,
  IconSquareRotated,
  IconSword,
  IconUsers
} from '@tabler/icons-react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { usePathname } from 'next/navigation'
import { useSidebarStore } from '@/utils/store/use-open'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/react'
import Link from 'next/link'
import clsx from 'clsx'

const navInfo = {
  title: 'Admin Panel',
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
  const isOpen = useSidebarStore((state) => state.isOpen)
  const onOpenChange = useSidebarStore((state) => state.onOpenChange)

  return (
    <nav
      className={clsx(
        'hidden md:block transition-all ease-in-out duration-250',
        isOpen ? 'w-0 mr-0' : 'w-[275px] mr-2 lg:mr-4'
      )}
    >
      <Card className='h-[calc(100vh_-_1rem)] sticky top-2 bg-color-dark z-20 space-y-4'>
        <CardHeader className=' h-full max-h-[96px] p-4'>
          <Button
            onPress={() => onOpenChange()}
            className='bg-transparent text-2xl font-medium px-0'
            color='primary'
            startContent={<IconLayoutSidebar size={32} />}
          >
            Admin Panel
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className='py-0'>
          <Listbox aria-label='Panel Dashboard'>
            {navInfo.items.map((item, index) => (
              <ListboxItem
                as={Link}
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
