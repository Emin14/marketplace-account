import styles from './pagination.module.css'

export function Pagination({ currentPage, totalPages, onPageChange }) {
  
  const totalPagesArray = Array(totalPages)
    .fill()
    .map((_, i) => i + 1)

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className={styles.pageButton}
        >
          Назад
        </button>
      )}
      {totalPagesArray.map((item) => (
        <span
          key={item}
          className={`${styles.pageButton} ${item === currentPage ? styles.activePage : ''}`}
          onClick={() => onPageChange(item)}
        >
          {item}
        </span>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className={styles.pageButton}
        >
          Вперед
        </button>
      )}
    </div>
  )
}
