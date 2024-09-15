import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import styles from './layout.module.css'

export function Layout() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
