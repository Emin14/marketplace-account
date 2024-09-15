import { useState } from 'react'
import { API_BASE_URL } from '../config'
import { InputsValue } from '../types'

export const useEditAdvertisement = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [response, setResponse] = useState(null)

  const editAdvertisement = async (body: InputsValue, id: string) => {
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
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Не удалось сохранить изменения. Попробуйте снова.')
      }
    }
  }

  return { editAdvertisement, errorMessage, response }
}
