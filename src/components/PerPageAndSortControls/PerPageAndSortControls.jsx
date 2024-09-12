import styles from './perPageAndSortControls .module.css'

export function PerPageAndSortControls({
  elements,
  adsPerPage,
  setAdsPerPage,
  setCurrentPage,
  sort,
  setSort,
}) {
  const handAdsPerPage = (e) => {
    setAdsPerPage(e.target.value)
    setCurrentPage(1)
  }

  return (
    <>
      <div className={styles.selectWrapper}>
        <label htmlFor="adsPerPage" className={styles.selectLabel}>
          Показывать на странице:
        </label>
        <div className={styles.selectContainer}>
          <select
            id="adsPerPage"
            className={styles.styledSelect}
            value={adsPerPage}
            onChange={handAdsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className={styles.selectWrapper}>
        <label htmlFor="sorting" className={styles.selectLabel}>
          Сортировать по:
        </label>
        <div className={styles.selectContainer}>
          <select
            id="sorting"
            className={styles.styledSelect}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {Object.keys(elements).map((key) => (
              <option key={key} value={key}>
                {elements[key]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
