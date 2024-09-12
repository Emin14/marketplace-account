import classNames from 'classnames'
import { filterConverter } from '../../utils/filterConverter'
import styles from './advertisementsFilter.module.css'

export function AdvertisementsFilter({ setUrl, filter, setFilter }) {
  const inputFilled = Object.keys(filter).some((item) => filter[item])

  const resetButton = classNames(styles.resetButton, {
    [styles.activeReset]: inputFilled,
  })

  const handleFilter = (event) => {
    event.preventDefault()
    const filtersUrl = filterConverter(filter)
    setUrl(filtersUrl)
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFilter((prevFilter) => ({
      ...prevFilter,
      [id]: value,
    }))
  }

  const handleResetFilter = () => {
    setUrl('')
    setFilter({
      name: '',
      minPrice: '',
      maxPrice: '',
      minViews: '',
      maxViews: '',
      minLikes: '',
      maxLikes: '',
    })
  }

  const clearInput = (id) => {
    const newFilter = { ...filter }
    newFilter[id] = ''
    setFilter(newFilter)
  }

  return (
    <form className={styles.container} onSubmit={handleFilter}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          id="name"
          placeholder="Поиск по названию"
          value={filter.name}
          onChange={handleChange}
        />
        {filter.name && (
          <button
            className={styles.clearButton}
            onClick={() => clearInput('name')}
          >
            ×
          </button>
        )}
      </div>
      <div>
        <label className={styles.label}>Цена, ₽</label>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="number"
            id="minPrice"
            placeholder="От"
            value={filter.minPrice}
            onChange={handleChange}
          />
          {filter.minPrice && (
            <button
              className={styles.clearButton}
              onClick={() => clearInput('minPrice')}
            >
              ×
            </button>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="number"
            id="maxPrice"
            placeholder="До"
            value={filter.maxPrice}
            onChange={handleChange}
          />
          {filter.maxPrice && (
            <button
              className={styles.clearButton}
              onClick={() => clearInput('maxPrice')}
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div>
        <label className={styles.label}>Просмотры</label>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="number"
            id="minViews"
            placeholder="От"
            value={filter.minViews}
            onChange={handleChange}
          />
          {filter.minViews && (
            <button
              className={styles.clearButton}
              onClick={() => clearInput('minViews')}
            >
              ×
            </button>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="number"
            id="maxViews"
            placeholder="До"
            value={filter.maxViews}
            onChange={handleChange}
          />
          {filter.maxViews && (
            <button
              className={styles.clearButton}
              onClick={() => clearInput('maxViews')}
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div>
        <label className={styles.label}>Лайки</label>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="number"
            id="minLikes"
            placeholder="От"
            value={filter.minLikes}
            onChange={handleChange}
          />
          {filter.minLikes && (
            <button
              className={styles.clearButton}
              onClick={() => clearInput('minLikes')}
            >
              ×
            </button>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="number"
            id="maxLikes"
            placeholder="До"
            value={filter.maxLikes}
            onChange={handleChange}
          />
          {filter.maxLikes && (
            <button
              className={styles.clearButton}
              onClick={() => clearInput('maxLikes')}
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button type="submit" className={styles.filterButton}>
          Показать
        </button>
        <button
          type="button"
          className={resetButton}
          onClick={handleResetFilter}
        >
          Сбросить
        </button>
      </div>
    </form>
  )
}
