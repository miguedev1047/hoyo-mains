'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import CountUp from 'react-countup'
import useSWR from 'swr'

const Countup = ({ url }: { url: string }) => {
  const API_PREFIX = url.split('/').pop()

  const { data, isLoading, error } = useSWR(`/api/${API_PREFIX}`, fetcher)

  if (error)
    return <span className='text-color-red text-xl font-semibold'>0</span>
  if (isLoading)
    return <span className='text-color-red text-xl font-semibold'>0</span>

  const dataLength = data?.length as number

  return (
    <CountUp
      className='text-color-red text-xl font-semibold'
      end={dataLength}
      duration={5}
    />
  )
}

export default Countup
