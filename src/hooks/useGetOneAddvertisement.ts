import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config'
import { Advertisement } from '../types'

type UseGetOneAdvertisementResult = {
  advertisement: Advertisement | null
  loading: boolean
  error: string
}

export function useGetOneAddvertisement(
  id: string,
): UseGetOneAdvertisementResult {
  const [advertisement, setAdvertisement] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOneAdvertisement = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/advertisements/${id}`)
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных')
        }
        const data = await response.json()
        setAdvertisement(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Произошла неизвестная ошибка')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOneAdvertisement()
  }, [id])

  return { advertisement, loading, error }
}
