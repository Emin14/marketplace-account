import { Link } from 'react-router-dom'
import styles from './home.module.css'

export function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.categories}>
        <Link to="/advertisements">
          <div className={styles.categoryOrders}>Объявления</div>
        </Link>
        <Link to="/orders">
          <div className={styles.categoryAdvrtisement}>Заказы</div>
        </Link>
      </div>
    </div>
  )
}
