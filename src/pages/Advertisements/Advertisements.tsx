import { useEffect, useState } from 'react'
import { imagesList } from '../../../public/assets/imagesList'
import { useGetData } from '../../hooks/useGetData'
import { usePostAdvertisement } from '../../hooks/usePostAdvertisement'
import {
  AdvertisementCard,
  Pagination,
  AddAdvertisementModal,
  AdvertisementsFilter,
  Spinner,
  PerPageAndSortControls,
} from '../../components'
import { Advertisement, Order } from '../../types'
import styles from './advertisements.module.css'

export function Advertisements() {
  const [currentPage, setCurrentPage] = useState(1)
  const [adsPerPage, setAdsPerPage] = useState(10)
  const [url, setUrl] = useState('')

  const [sort, setSort] = useState('id')
  const { addAdvertisement, response } = usePostAdvertisement()
  const {
    data: advertisements = [],
    pages: { totalPages },
    loading,
    error,
  } = useGetData<Advertisement>(
    'advertisements',
    currentPage,
    adsPerPage,
    sort,
    url,
    response,
  )

  const { data: orders } = useGetData<Order>('orders', 1)

  const [newPost, setNewPost] = useState({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
    minViews: '',
    maxViews: '',
    minLikes: '',
    maxLikes: '',
  })

  useEffect(() => {
    setNewPost({
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
    })
  }, [response])

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <AdvertisementsFilter
          setUrl={setUrl}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <div className={styles.content}>
        {loading && <Spinner />}
        {error && <p>Ошибка загрузки данных: {error}</p>}

        {!error && (
          <div className={styles.contentHeader}>
            <PerPageAndSortControls
              elements={{ id: 'ID', price: 'Цене' }}
              adsPerPage={adsPerPage}
              setAdsPerPage={setAdsPerPage}
              setCurrentPage={setCurrentPage}
              sort={sort}
              setSort={setSort}
            />

            <button
              className={styles.addAdButton}
              onClick={() => setIsModalOpen(true)}
            >
              Разместить объявление
            </button>
          </div>
        )}

        <div className={styles.advertisementCards}>
          {advertisements?.map((advertisement) => (
            <AdvertisementCard
              key={advertisement.id}
              advertisement={advertisement}
              orders={orders}
            />
          ))}
          {!advertisements?.length && !error ? (
            <p>Нет объявлений по заданным критериям</p>
          ) : (
            ''
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <AddAdvertisementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addAdvertisement}
        imagesList={imagesList}
        inputsValue={newPost}
        setIsModalOpen={setIsModalOpen}
        setInputsValue={setNewPost}
      />
    </div>
  )
}
