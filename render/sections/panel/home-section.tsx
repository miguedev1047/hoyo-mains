import { homeItems } from '@/constants'
import { Card, CardFooter } from '@nextui-org/card'
import { User } from 'next-auth'
import Link from 'next/link'
import Image from 'next/image'
import Countup from '@/render/components/UI/countup'

const HomeSection = ({user}: {user: User}) => {
  return (
    <section className='space-y-8'>
      <article className='text-center font-semibold space-y-4'>
        <h1 className='text-5xl'>
          ¡Bienvenido <span className='text-color-red'>{user?.name}</span>
        </h1>
      </article>

      <ol className='w-full flex gap-4'>
        {homeItems.map((item) => (
          <li
            key={item.title}
            className='w-full h-[400px] flex-1 hover:flex-[5] transition-all duration-700 ease-in-beizer select-none'
          >
            <Link href={item.url}>
              <Card
                isBlurred
                isFooterBlurred
                className='w-full h-full bg-color-dark'
              >
                <Image
                  src={item.background}
                  alt={item.title}
                  width={1280}
                  height={720}
                  className='w-full h-full object-cover rounded-xl'
                />
                <CardFooter className='flex items-center justify-between bg-color-dark/75 border-color-dark/20 border-1 overflow-hidden py-1.5 px-4 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
                  <h2 className='text-xl font-semibold line-clamp-1'>
                    {item.title}
                  </h2>
                  
                  <Countup url={item.url} />
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default HomeSection
