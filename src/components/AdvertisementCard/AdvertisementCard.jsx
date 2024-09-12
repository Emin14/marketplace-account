import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'
import styles from './advertisementCard.module.css'

export function AdvertisementCard({ advertisement, orders }) {
  const navigate = useNavigate()

  const handleOrdersClick = () => {
    navigate('/orders', {
      state: { advertisementId: advertisement.id },
    })
  }

  const isProductInOrders = orders?.some((order) =>
    order.items.some((item) => item.id === advertisement.id),
  )

  const ordersButton = classNames(styles.ordersButton, {
    [styles.disabled]: !isProductInOrders,
    [styles.enabled]: !!isProductInOrders,
  })

  const imageUrl = advertisement.imageUrl || '/assets/notimg.jpg'

  return (
    <div className={styles.advertisementCard}>
      <div
        className={styles.content}
        onClick={() => navigate(`/advertisements/${advertisement.id}`)}
      >
        <div className={styles.stats}>
          <div className={styles.iconWrapper}>
            <AiOutlineEye className={styles.icon} />
            <span>{advertisement.views}</span>
          </div>
          <div className={styles.iconWrapper}>
            <AiOutlineHeart className={styles.icon} />
            <span>{advertisement.likes}</span>
          </div>
        </div>
        <img src={imageUrl} alt={advertisement.name} className={styles.image} />

        <h3 className={styles.title}>{advertisement.name}</h3>
        <p className={styles.price}>{advertisement.price} ₽</p>
      </div>
      <button
        className={ordersButton}
        onClick={isProductInOrders ? handleOrdersClick : null}
      >
        Заказы
      </button>
    </div>
  )
}
