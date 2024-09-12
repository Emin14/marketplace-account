import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  OrderCard,
  Pagination,
  OrdersFilter,
  Spinner,
  PerPageAndSortControls,
} from '../../components'
import { useGetData } from '../../hooks/useGetData'
import styles from './orders.module.css'

export function Orders() {
  const location = useLocation()
  const [sort, setSort] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [url, setUrl] = useState('')
  const [ordersByAdvertisements, setOrdersByAdvertisements] = useState(null)
  const [ordersByAdvertisementsPages, setOrdersByAdvertisementsPages] =
    useState(null)
  const [adsPerPage, setAdsPerPage] = useState(20)

  const {
    data,
    pages: { pages },
    loading,
    error,
  } = useGetData('orders', currentPage, adsPerPage, sort, url)
  const [selectedStatus, setSelectedStatus] = useState({})

  let orders = ordersByAdvertisements ?? data
  const ordersPage = ordersByAdvertisementsPages ?? pages

  const advertisementId = location.state?.advertisementId

  useEffect(() => {
    if (!advertisementId || !data) {
      return
    }

    const filteredOrders = data.filter((order) => {
      return order.items.some((item) => item.id === advertisementId)
    })
    console.log(data)
    console.log(filteredOrders)
    setSelectedStatus({})
    setUrl('')
    setOrdersByAdvertisements(filteredOrders)
    const pages = Math.ceil(filteredOrders.length / adsPerPage)
    setOrdersByAdvertisementsPages(pages)
  }, [advertisementId, data, adsPerPage])

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <OrdersFilter
          setUrl={setUrl}
          setOrdersByAdvertisements={setOrdersByAdvertisements}
          setOrdersByAdvertisementsPages={setOrdersByAdvertisements}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </div>
      <div className={styles.content}>
        {loading && <Spinner />}
        {error && <p>Ошибка загрузки данных: {error}</p>}

        {!error && (
          <div className={styles.contentHeader}>
            <PerPageAndSortControls
              elements={{ id: 'ID', total: 'Сумме' }}
              adsPerPage={adsPerPage}
              setAdsPerPage={setAdsPerPage}
              setCurrentPage={setCurrentPage}
              sort={sort}
              setSort={setSort}
            />
          </div>
        )}
        <div className={styles.orders}>
          {orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {!orders.length && !error ? (
          <p>Нет заказов по заданным критериям</p>
        ) : (
          ''
        )}

        {!!ordersPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={ordersPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}
