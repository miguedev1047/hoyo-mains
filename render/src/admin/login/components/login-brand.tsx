import { NoelleLoginBrand } from '@/assets'
import { Figure } from '@/render/src/shared/components/figure'
import { Image } from '@nextui-org/react'

const LoginBrand = () => {
  return (
    <Figure size='full' className='hidden lg:block w-full max-w-1/2 h-[calc(100vh_-_1rem)] select-none'>
      <Image
        className='w-full h-[calc(100vh_-_1rem)] object-cover after:content-["*"] after:absolute after:inset-0 after:bg-black/70 after:z-10 after:backdrop-blur-[10px]'
        src={NoelleLoginBrand.src}
        alt='Noelle Brand'
      />
      <div className='absolute top-0 bottom-0 size-full z-20 bg-black/30'></div>
    </Figure>
  )
}

export default LoginBrand
