import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { formatDate } from '../../utils/formatDate'
import styles from './orderCard.module.css'
import { Order } from '../../types'
import { getOrderStatusText } from '../../utils/getOrderStatusText'

export function OrderCard({ order }: { order: Order }) {
  const [showItems, setShowItems] = useState(false)
  const [showClue, setShowClue] = useState(false)
  const navigate = useNavigate()

  const notReceived = order.status < 4

  const cancelBtn = classNames(
    styles.cancelBtn,
    !notReceived ? styles.disabled : styles.active,
  )

  const clueClass = classNames(styles.clue, {
    [styles.clueVisible]: showClue && !notReceived,
  })

  const handleItemClick = (itemId: string) => {
    navigate(`/advertisements/${itemId}`)
  }

  const toggleShowItems = () => {
    setShowItems(!showItems)
  }

  return (
    <div className={styles.order}>
      <div className={styles.header}>
        <p>
          <span>Заказ: </span>
          <span>{order.id}</span>
        </p>
        <div
          className={styles.wrapperCancelBtn}
          onMouseEnter={() => setShowClue(true)}
          onMouseLeave={() => setShowClue(false)}
        >
          <span className={clueClass}>Нельзя отменить полученный заказ</span>
          <button className={cancelBtn}>
            {notReceived ? 'Завершить заказ' : 'Нельзя завершить заказ'}
          </button>
        </div>
      </div>

      <p>
        <span>Дата создания заказа: </span>
        <span>{formatDate(order.createdAt)}</span>
      </p>
      <p>
        <span>Статус: </span>
        <span>{getOrderStatusText(order.status)}</span>
      </p>
      <p>
        <span>Сумма заказа: </span>
        <span>{order.total}</span>
      </p>
      <p>
        <span>Количество товаров: </span>
        <span>{order.items.length}</span>
      </p>

      <button className={styles.showItemsButton} onClick={toggleShowItems}>
        {showItems ? 'Скрыть товары' : 'Показать все товары'}
      </button>

      {showItems && (
        <div className={styles.itemsList}>
          {order.items.map((item) => (
            <div
              key={item.id}
              className={styles.item}
              onClick={() => handleItemClick(item.id)}
            >
              <img
                src={item.imageUrl || '/assets/notimg.jpg'}
                alt={item.name}
              />
              <div>
                <p>
                  <span>Название:</span> {item.name}
                </p>
                <p>
                  <span>Цена:</span> {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
