'use client'

interface FetchResult<T> {
  data: T | undefined
  isLoading: boolean
  error: any
  isValidating: boolean
  mutate: KeyedMutator<T>
}

import useSWR, { KeyedMutator } from 'swr'
import { fetcher } from '../helpers/fetcher'

export const useFetch = <T>(url: string): FetchResult<T> => {
  const { data, isLoading, error, isValidating, mutate } = useSWR<T>(
    url,
    fetcher
  )
  return { data, isLoading, error, isValidating, mutate }
}
