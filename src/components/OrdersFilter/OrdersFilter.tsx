import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { ordersFilterConverter } from '../../utils/ordersFilterConverter'
import { Order, OrderStatus, OrderStatusKeys } from '../../types'
import styles from './ordersFilter.module.css'

type OrdersFilterProps = {
  setUrl: React.Dispatch<React.SetStateAction<string>>
  setOrdersByAdvertisements: React.Dispatch<
    React.SetStateAction<Order[] | null>
  >
  setOrdersByAdvertisementsPages: React.Dispatch<React.SetStateAction<number>>
  selectedStatus: Partial<Record<OrderStatusKeys, boolean>>
  setSelectedStatus: React.Dispatch<
    React.SetStateAction<Partial<Record<OrderStatusKeys, boolean>>>
  >
}

export function OrdersFilter({
  setUrl,
  setOrdersByAdvertisements,
  setOrdersByAdvertisementsPages,
  selectedStatus,
  setSelectedStatus,
}: OrdersFilterProps) {
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setSelectedStatus({ [name]: checked })
  }

  const inputFilled = Object.keys(selectedStatus).some(
    (item) => selectedStatus[item as OrderStatusKeys],
  )

  const resetButton = classNames(styles.resetButton, {
    [styles.activeReset]: inputFilled,
  })

  const handleReset = () => {
    setSelectedStatus({})
    setUrl('')
    setOrdersByAdvertisements(null)
    setOrdersByAdvertisementsPages(0)
    navigate(location.pathname, { replace: true, state: {} })
  }

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const filtersUrl = ordersFilterConverter(selectedStatus, OrderStatus)
    setUrl(filtersUrl)
  }

  return (
    <form onSubmit={handleFilter} className={styles.container}>
      <div className={styles.header}>
        <h4>Статус заказа</h4>
      </div>
      <div className={styles.checkboxElements}>
        {Object.keys(OrderStatus).map((statusKey) => (
          <label key={statusKey} className={styles.label}>
            <input
              type="checkbox"
              name={statusKey}
              checked={!!selectedStatus[statusKey as keyof typeof OrderStatus]}
              onChange={handleChange}
            />
            {statusKey}
          </label>
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <button type="submit" className={styles.filterButton}>
          Показать
        </button>
        <button type="button" className={resetButton} onClick={handleReset}>
          Сбросить
        </button>
      </div>
    </form>
  )
}
