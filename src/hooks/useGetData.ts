import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config'
import { UseGetDataResult } from '../types'

export function useGetData<T>(
  category: string,
  currentPage?: number,
  adsPerPage?: number,
  sort?: string,
  filter?: string,
  dependence?: Record<string, unknown> | null,
): UseGetDataResult<T> {
  const [data, setData] = useState([])
  const [pages, setPages] = useState({
    totalPages: 0,
    first: 0,
    items: 0,
    last: 0,
    next: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(
          `${API_BASE_URL}/${category}?_page=${currentPage}&_per_page=${adsPerPage}&_sort=${sort}${filter}`,
          { signal },
        )
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных')
        }
        const responseJson = await response.json()
        const {
          data,
          first,
          items,
          last,
          next,
          pages: totalPages,
        } = responseJson
        setData(data)
        setPages({ first, items, last, next, totalPages })
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          console.error('Произошла неизвестная ошибка')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [category, currentPage, adsPerPage, sort, filter, dependence])

  return { data, pages, loading, error }
}
