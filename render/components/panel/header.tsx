import UserButton from '@/render/components/panel/user-button'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/navbar'

interface HeaderProps {
  title?: string
  startContent?: JSX.Element
}

const Header = ({ title, startContent }: HeaderProps) => {
  return (
    <Navbar className='bg-color-lightest text-color-darkest rounded-3xl p-4' classNames={{
      wrapper: 'max-w-full px-2'
    }}>
      <NavbarBrand className='space-x-3'>
        {startContent}
        <h1 className=' text-4xl font-medium'>{title}</h1>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem>
          <UserButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
