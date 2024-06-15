import { Spinner } from '@nextui-org/react'

export const SectionFallback = () => {
  return (
    <section className='w-full h-screen grid place-items-center'>
      <Spinner size='lg' color='default' />
    </section>
  )
}
