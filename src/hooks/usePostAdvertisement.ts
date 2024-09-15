import { useState } from 'react'
import { API_BASE_URL } from '../config'
import { Advertisement, InputsValue } from '../types'

export const usePostAdvertisement = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [response, setResponse] = useState<Advertisement | null>(null)

  const addAdvertisement = async (post: InputsValue): Promise<void> => {
    try {
      const body = {
        ...post,
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0,
      }

      const response = await fetch(`${API_BASE_URL}/advertisements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error('Ошибка при добавлении объявления')
      }
      const res = await response.json()
      setResponse(res)
      setErrorMessage('')
    } catch (error) {
      console.error('Ошибка добавления объявления:', error)
      setErrorMessage('Не удалось добавить объявление. Попробуйте снова')
    }
  }

  return {
    addAdvertisement,
    errorMessage,
    response,
  }
}
