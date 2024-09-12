import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config'

export function useGetOneAddvertisement(id) {
  const [advertisement, setAdvertisement] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOneAdvertisement()
  }, [id])

  return { advertisement, loading, error }
}
