import { User } from 'next-auth'
import PanelList from '@/render/src/panel/home/components/panel-list'

interface PanelContainerProps {
  user: User | undefined
}

const Panel = ({ user }: PanelContainerProps) => {
  return (
    <>
      <article className='text-center font-semibold'>
        <h1 className='text-xl md:text-3xl lg:text-5xl'>
          ¡Bienvenido <span className='text-color-red'>{user?.name}</span>!
        </h1>
      </article>

      <PanelList />
    </>
  )
}

export default Panel
