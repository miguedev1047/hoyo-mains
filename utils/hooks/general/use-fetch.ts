'use client'

interface FetchResult<T> {
  data: T | undefined
  isLoading: boolean
  error: any
}

import { fetcher } from '@/utils/helpers/fetcher'
import useSWR from 'swr'

export const useFetch = <T>(url: string): FetchResult<T> => {
  const { data, isLoading, error } = useSWR<T>(url, fetcher)
  return { data, isLoading, error }
}
