import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { orderStatus } from '../../assets/orderStatus'
import { ordersFilterConverter } from '../../utils/ordersFilterConverter'
import styles from './ordersFilter.module.css'

export function OrdersFilter({
  setUrl,
  setOrdersByAdvertisements,
  setOrdersByAdvertisementsPages,
  selectedStatus,
  setSelectedStatus,
}) {
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, checked } = e.target
    setSelectedStatus({ [name]: checked })
  }

  const inputFilled = Object.keys(selectedStatus).some(
    (item) => selectedStatus[item],
  )

  const resetButton = classNames(styles.resetButton, {
    [styles.activeReset]: inputFilled,
  })

  const handleReset = () => {
    setSelectedStatus({})
    setUrl('')
    setOrdersByAdvertisements(null)
    setOrdersByAdvertisementsPages(null)
    navigate(location.pathname, { replace: true, state: {} })
  }

  const handleFilter = (event) => {
    event.preventDefault()
    const filtersUrl = ordersFilterConverter(selectedStatus)
    setUrl(filtersUrl)
  }

  return (
    <form onSubmit={handleFilter} className={styles.container}>
      <div className={styles.header}>
        <h4>Статус заказа</h4>
      </div>
      <div className={styles.checkboxElements}>
        {Object.keys(orderStatus).map((statusKey) => (
          <label key={statusKey} className={styles.label}>
            <input
              type="checkbox"
              name={statusKey}
              checked={!!selectedStatus[statusKey]}
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
