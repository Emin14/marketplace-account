import { Link } from 'react-router-dom'
import styles from './notFound.module.css'

export function NotFound() {
  return (
    <div>
      <h1>404 - Страница не найдена</h1>
      <p>Извините, страница, которую вы ищете, не существует.</p>
      <div className={styles.linkWrapper}>
        <Link className={styles.link} to="/">
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}