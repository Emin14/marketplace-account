import { ChangeEvent, useState } from 'react'
import { InputsValue } from '../../types'
import styles from './AddAdvertisementModal.module.css'

type InputsValueModal = InputsValue & {
  name: string
  price: number
  description: string
  imageUrl: string
}

interface AddAdvertisementModalProps {
  isOpen: boolean
  onClose: () => void
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onAdd: (inputsValue: InputsValueModal, id?: string) => Promise<void> | void
  imagesList: string[]
  isEditing?: boolean
  inputsValue: InputsValueModal
  setInputsValue: React.Dispatch<React.SetStateAction<InputsValueModal>>
  id?: string
}

export function AddAdvertisementModal({
  isOpen,
  onClose,
  setIsModalOpen,
  onAdd,
  imagesList,
  isEditing,
  inputsValue,
  setInputsValue,
  id,
}: AddAdvertisementModalProps) {
  const [errorMessage, setErrorMessage] = useState('')

  function handleClick() {
    if (!inputsValue.name || !inputsValue.price) {
      setErrorMessage('Название и цена обязательны для заполнения.')
      return false
    }
    onAdd(inputsValue, id)
    setIsModalOpen(false)
    setErrorMessage('')
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    let newValue: string | number = value
    if (name === 'price') {
      newValue = parseFloat(value)
    }
    setInputsValue((prevInputsValue) => ({
      ...prevInputsValue,
      [name]: newValue,
    }))
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>
          {isEditing ? 'Редактировать объявление' : 'Добавить новое объявление'}
        </h2>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <label>Выбрать картинку:</label>
        <select
          name="imageUrl"
          value={inputsValue.imageUrl}
          onChange={handleChange}
        >
          <option value="">Без изображения</option>
          {imagesList.map((image) => (
            <option key={image} value={image}>
              {image.split('/').pop()}
            </option>
          ))}
        </select>
        <label>Название:</label>
        <input
          type="text"
          name="name"
          value={inputsValue.name || ''}
          onChange={handleChange}
        />
        <label>Цена:</label>
        <input
          type="number"
          name="price"
          value={inputsValue.price || ''}
          onChange={handleChange}
        />

        <label>Описание:</label>
        <textarea
          name="description"
          value={inputsValue.description || ''}
          onChange={handleChange}
        />

        <div className={styles.modalActions}>
          <button id="cancelBtn" className={styles.button} onClick={onClose}>
            Отмена
          </button>
          <button className={styles.button} onClick={handleClick}>
            {isEditing ? 'Изменить' : 'Добавить'}
          </button>
        </div>
      </div>
    </div>
  )
}
