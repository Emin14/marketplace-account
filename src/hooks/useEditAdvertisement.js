import { useState } from 'react'
import { API_BASE_URL } from '../config'

export const useEditAdvertisement = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [response, setResponse] = useState(null)

  const editAdvertisement = async (body, id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/advertisements/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error('Ошибка при сохранении данных')
      }

      const res = await response.json()
      setResponse(res)
      setErrorMessage('')
    } catch (error) {
      console.error('Ошибка сохранения:', error)
      setErrorMessage('Не удалось сохранить изменения. Попробуйте снова.')
    }
  }

  return { editAdvertisement, errorMessage, response }
}
