'use client'

import {
  IconHome,
  IconHourglassEmpty,
  IconLayoutSidebar,
  IconSquareRotated,
  IconSword,
  IconUsers,
  IconUsersGroup
} from '@tabler/icons-react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox'
import { usePathname } from 'next/navigation'
import { useSidebarStore } from '@/render/src/panel/shared/utilities/store/use-sidebar-store'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/react'
import clsx from 'clsx'
import Link from 'next/link'

const navItems = {
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
      href: '/panel/teams',
      icon: <IconUsersGroup />,
      title: 'Equipos'
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
  const dashboadrItems = navItems.items.slice(0, 1)
  const adminItems = navItems.items.slice(1)

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
            className='bg-transparent text-2xl font-medium px-0 line-clamp-1'
            color='primary'
            startContent={<IconLayoutSidebar size={32} />}
          >
            HoYo Panel
          </Button>
        </CardHeader>
        <CardBody className='py-0'>
          <Divider />
          <Listbox className='my-2' aria-label='Panel Dashboard Sidebar'>
            <ListboxSection title='Dashboard'>
              {dashboadrItems.map((item) => (
                <ListboxItem
                  as={Link}
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    pathname === item.href && 'bg-primary-color line-clamp-1'
                  )}
                  startContent={item.icon}
                >
                  {item.title}
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
          <Divider />
          <Listbox className='my-2' aria-label='Panel Admin Sidebar'>
            <ListboxSection title='Administrar'>
              {adminItems.map((item) => (
                <ListboxItem
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    pathname === item.href && 'bg-primary-color line-clamp-1'
                  )}
                  startContent={item.icon}
                >
                  {item.title}
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
          <Divider />
        </CardBody>
      </Card>
    </nav>
  )
}

export default Sidebar
