"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"

export function useQueryParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (params: Record<string, string | string[] | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          newSearchParams.delete(key)
        } else if (Array.isArray(value)) {
          newSearchParams.delete(key)
          if (value.length > 0) {
            value.forEach((v) => newSearchParams.append(key, v))
          }
        } else {
          newSearchParams.set(key, value)
        }
      })

      return newSearchParams.toString()
    },
    [searchParams],
  )

  const updateQuery = useCallback(
    (params: Record<string, string | string[] | null>) => {
      const queryString = createQueryString(params)
      router.push(`${pathname}?${queryString}`)
    },
    [pathname, router, createQueryString],
  )

  const getQueryValue = useCallback(
    (key: string): string | null => {
      return searchParams?.get(key) || null
    },
    [searchParams],
  )

  const getQueryValues = useCallback(
    (key: string): string[] => {
      return searchParams?.getAll(key) || []
    },
    [searchParams],
  )

  return {
    updateQuery,
    getQueryValue,
    getQueryValues,
    searchParams,
  }
}
