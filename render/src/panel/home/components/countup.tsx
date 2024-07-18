'use client'

import { useFetch } from '@/utils/hooks/general/use-fetch'
import CountUp from 'react-countup'

const Countup = ({ url }: { url: string }) => {
  const API_PREFIX = url.split('/').pop()
  const { data, isLoading, error } = useFetch<Array<any>>(`/api/${API_PREFIX}`)

  if (error)
    return <span className='text-color-red text-xl font-semibold'>0</span>
  if (isLoading)
    return <span className='text-color-red text-xl font-semibold'>0</span>

  if (!data)
    return <span className='text-color-red text-xl font-semibold'>0</span>

  return (
    <CountUp
      className='text-color-red text-xl font-semibold'
      end={data?.length}
      duration={5}
    />
  )
}

export default Countup
