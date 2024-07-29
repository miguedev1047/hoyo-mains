'use client'

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
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { IconChevronDown } from '@tabler/icons-react'
import NextLink from 'next/link'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className='max-w-[1280px] rounded-xl container mx-auto transition-all ease-in-out duration-300 bg-color-dark/80'
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
        <NavbarItem isActive={pathname === '/'}>
          <Link as={NextLink} color='foreground' href='/'>
            Personajes
          </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === '/builds'}>
          <Link as={NextLink} color='foreground' href='/builds'>
            Builds
          </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === '/teams'}>
          <Link as={NextLink} color='foreground' href='/teams'>
            Equipos
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
            <DropdownItem key='weapons' href='/weapons' as={NextLink}>
              Armas
            </DropdownItem>
            <DropdownItem key='artifacts' href='/artifacts' as={NextLink}>
              Artefactos
            </DropdownItem>
            <DropdownItem key='materials' href='/materials' as={NextLink}>
              Materiales
            </DropdownItem>
            <DropdownItem key='elements' href='/elements' as={NextLink}>
              Elementos
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className='sm:hidden'
      />
      <NavbarMenu className='rounded-xl mt-2'>
        <NavbarMenuItem isActive={pathname === '/'}>
          <Link color='foreground' as={NextLink} href='/'>
            Personajes
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === '/builds'}>
          <Link color='foreground' as={NextLink} href='/builds'>
            Builds
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === '/teams'}>
          <Link color='foreground' as={NextLink} href='/teams'>
            Equipos
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === '/weapons'}>
          <Link color='foreground' as={NextLink} href='/weapons'>
            Armas
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === '/artifacts'}>
          <Link color='foreground' as={NextLink} href='/artifacts'>
            Artefactos
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === '/materials'}>
          <Link color='foreground' as={NextLink} href='/materials'>
            Materiales
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === '/elements'}>
          <Link color='foreground' isDisabled as={NextLink} href='/elements'>
            Elementos
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default Navigation
