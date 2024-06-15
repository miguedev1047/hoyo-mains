import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/navbar'
import ButtonMenu from '@/render/components/UI/buttons/header/button-menu'
import UserButton from '@/render/components/panel/user-button'

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
          <ButtonMenu />
          {startContent}
          <h1 className='text-2xl lg:text-4xl font-medium'>{title}</h1>
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
