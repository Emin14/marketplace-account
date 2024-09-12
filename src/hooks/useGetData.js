import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config'

export const useGetData = (
  category,
  currentPage = 1,
  adsPerPage = 100,
  sort,
  filter,
  dependence,
) => {
  const [data, setData] = useState([])
  const [pages, setPages] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(
          `${API_BASE_URL}/${category}?_page=${currentPage}&_per_page=${adsPerPage}&_sort=${sort}${filter}`,
        )
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных')
        }
        const responseJson = await response.json()
        const { data, first, items, last, next, pages } = responseJson
        setData(data)
        setPages({ first, items, last, next, pages })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category, currentPage, adsPerPage, sort, filter, dependence])

  return { data, pages, loading, error }
}
