import { Link, NavLink } from 'react-router-dom'
import styles from './header.module.css'

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <Link to="/" className={styles.logoLink}>
            <span className={styles.logoText}>Random Service</span>
          </Link>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [styles.active, styles.navLink].join(' ')
                : styles.navLink
            }
            to="/advertisements"
          >
            Объявления
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [styles.active, styles.navLink].join(' ')
                : styles.navLink
            }
            to="/orders"
          >
            Заказы
          </NavLink>
        </div>
      </header>
    </>
  )
}
