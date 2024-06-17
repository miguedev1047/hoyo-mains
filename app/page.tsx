import Header from '@/render/components/home/header/header'
import SectionHome from '@/render/sections/home/section-home'

export default function Home() {
  return (
    <>
      <Header />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <SectionHome />
      </main>
    </>
  )
}
