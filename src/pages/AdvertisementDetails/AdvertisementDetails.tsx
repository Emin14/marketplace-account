import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'
import { AddAdvertisementModal } from '../../components'
import { imagesList } from '../../../public/assets/imagesList'
import styles from './AdvertisementDetails.module.css'

import { useEditAdvertisement } from '../../hooks/useEditAdvertisement'
import { useGetOneAddvertisement } from '../../hooks/useGetOneAddvertisement'

export function AdvertisementDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { advertisement, loading, error } = useGetOneAddvertisement(id!)

  const { editAdvertisement, response } = useEditAdvertisement()

  let data = response || advertisement

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
  })

  useEffect(() => {
    if (!data) {
      return
    }
    setFormData({
      name: data.name,
      price: data.price,
      description: data.description || '',
      imageUrl: data.imageUrl || '',
    })
  }, [data])

  const imageUrl = data?.imageUrl || '/assets/notimg.jpg'
  const description = data?.description || 'Описание отсутствует'

  if (loading) {
    return <p>Загрузка...</p>
  }
  if (error) {
    return <p>Ошибка загрузки данных</p>
  }
  if (!data) {
    return <p>Объявление не найдено</p>
  }

  return (
    <div className={styles.advertisementDetailsWrapper}>
      <div className={styles.advertisementDetails}>
        <div className={styles.header}>
          <h1 className={styles.title}>{data.name}</h1>
          <div className={styles.stats}>
            <div className={styles.iconWrapper}>
              <AiOutlineEye className={styles.icon} />
              <span>{data.views}</span>
            </div>
            <div className={styles.iconWrapper}>
              <AiOutlineHeart className={styles.icon} />
              <span>{data.likes}</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <img src={imageUrl} alt={data.name} className={styles.image} />
          <div className={styles.info}>
            <p className={styles.price}>
              <strong>Цена:</strong> {data.price} ₽
            </p>
            <p className={styles.description}> {description}</p>
          </div>
        </div>

        <button
          className={styles.editButton}
          onClick={() => setIsModalOpen(true)}
        >
          Редактировать
        </button>

        <AddAdvertisementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={(inputsValue) => editAdvertisement(inputsValue, id!)}
          imagesList={imagesList}
          isEditing={true}
          inputsValue={formData}
          setInputsValue={setFormData}
          setIsModalOpen={setIsModalOpen}
          id={id}
        />
      </div>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Вернуться назад
      </button>
    </div>
  )
}
