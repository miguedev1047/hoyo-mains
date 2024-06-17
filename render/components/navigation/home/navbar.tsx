'use client'

import { useState } from 'react'
import { navigationItems } from '@/constants'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Chip,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { IconChevronDown } from '@tabler/icons-react'
import NextLink from 'next/link'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      className='max-w-[1280px] rounded-xl container mx-auto transition-all ease-in-out duration-300'
    >
      <NavbarBrand className='space-x-2'>
        <NavbarItem>
          <Link
            as={NextLink}
            href='/'
            className='text-lg font-bold text-inherit'
          >
            HoYo Mains
          </Link>
        </NavbarItem>
        <Chip>Beta</Chip>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link as={NextLink} color='foreground' href='/characters'>
            Personajes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} color='foreground' href='/teams'>
            Equipos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} color='foreground' href='/builds'>
            Builds
          </Link>
        </NavbarItem>
        <Dropdown className='bg-color-dark'>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                variant='light'
                endContent={<IconChevronDown />}
                radius='sm'
                className='p-0 text-foreground bg-transparent data-[hover=true]:bg-transparent'
              >
                Database
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            className='max-w-[340px]'
            aria-label='Database Links'
            classNames={{
              base: 'gap-4'
            }}
          >
            <DropdownItem
              key='weapons'
              href='/weapons
            '
            >
              Armas
            </DropdownItem>
            <DropdownItem
              key='artifacts'
              href='/artifacts
            '
            >
              Artefactos
            </DropdownItem>
            <DropdownItem
              key='materiales'
              href='/materials
            '
            >
              Materiales
            </DropdownItem>
            <DropdownItem
              key='materiales'
              href='/elements
            '
            >
              Elementos
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className='sm:hidden'
      />
      <NavbarMenu className='rounded-xl'>
        {navigationItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link color='foreground' as={NextLink} href='/'>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default Navigation
