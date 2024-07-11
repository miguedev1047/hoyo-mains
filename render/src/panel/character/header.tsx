import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/navbar'
import { Chip } from '@nextui-org/react'
import UserButton from '@/render/src/panel/shared/components/buttons/user-button'
import ToggleSidebarButton from '@/render/src/panel/shared/components/buttons/toggle-sidebar-button'

interface HeaderProps {
  title?: string
  startContent?: JSX.Element
}

const Header = ({ title, startContent }: HeaderProps) => {
  return (
    <header>
      <Navbar
        className='bg-color-lightest text-color-darkest rounded-3xl p-4'
        classNames={{
          wrapper: 'max-w-full px-0 max-h-[96px]'
        }}
      >
        <NavbarBrand className='space-x-3'>
          <ToggleSidebarButton />
          <Chip className='max-xs:hidden bg-color-dark rounded-3xl px-5 py-8'>
            <div className='flex items-center gap-2'>
              {startContent}
              <h1 className='text-lg md:text-2xl font-medium capitalize'>
                {title ?? 'Indefinido'}
              </h1>
            </div>
          </Chip>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarItem>
            <UserButton />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </header>
  )
}

export default Header
