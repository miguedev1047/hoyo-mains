'use client'

import {
  IconHome,
  IconHourglassEmpty,
  IconLayoutSidebar,
  IconSquareRotated,
  IconSword,
  IconTrophy,
  IconUsers,
  IconUsersGroup
} from '@tabler/icons-react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox'
import { usePathname } from 'next/navigation'
import { useSidebarStore } from '@/render/src/panel/shared/utilities/store/use-sidebar-store'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/react'
import { cn } from '@/libs/utils'
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
    },
    {
      href: '/panel/tierlist',
      icon: <IconTrophy />,
      title: 'Tierlist'
    }
  ]
}

export const Sidebar = () => {
  const dashboardItems = navItems.items.slice(0, 1)
  const adminItems = navItems.items.slice(1)

  const { isOpen, onOpenChange } = useSidebarStore((state) => ({
    isOpen: state.isOpen,
    onOpenChange: state.onOpenChange
  }))

  return (
    <nav
      className={cn(
        'hidden md:block transition-all ease-in-out duration-250',
        isOpen ? 'w-0 mr-0' : 'w-[275px] mr-2 lg:mr-4'
      )}
    >
      <Card className='h-[calc(100vh_-_1rem)] sticky top-2 bg-color-dark z-20 space-y-4'>
        <CardHeader className=' h-full max-h-[96px] p-4'>
          {!isOpen && (
            <Button
              onPress={() => onOpenChange()}
              className='bg-transparent text-2xl font-medium px-0 line-clamp-1'
              color='primary'
              startContent={<IconLayoutSidebar size={32} />}
            >
              HoYo Panel
            </Button>
          )}
        </CardHeader>
        <CardBody className='py-0'>
          <Divider />
          <SidebarList items={dashboardItems} title='Dashboard' />
          <Divider />
          <SidebarList items={adminItems} title='Administrar' />
          <Divider />
        </CardBody>
      </Card>
    </nav>
  )
}

const SidebarList = ({
  items,
  title
}: {
  items: Array<any>
  title: string
}) => {
  const isOpen = useSidebarStore((state) => state.isOpen)
  const pathname = usePathname()

  if (isOpen) return null

  return (
    <Listbox className='my-2' aria-label={`Sidebar ${title}`}>
      <ListboxSection title={title}>
        {items.map((item) => (
          <ListboxItem
            key={item.href}
            href={item.href}
            as={Link}
            className={cn(
              pathname === item.href && 'bg-primary-color line-clamp-1'
            )}
            startContent={item.icon}
          >
            {item.title}
          </ListboxItem>
        ))}
      </ListboxSection>
    </Listbox>
  )
}
