'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import useSWR from 'swr'

export const useFetch = (url: string) => {
  const { data, isLoading, error } = useSWR(url, fetcher)
  return { data, isLoading, error }
}
