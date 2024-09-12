import { useEffect } from 'react'

export const useSaveInSessionStorage = (key, sessionData, dependencies) => {
  useEffect(() => {
    const savedFilters = JSON.parse(sessionStorage.getItem(key))
    if (savedFilters) {
      for (let key of sessionData.keys()) {
        const filterKey = Object.keys(sessionData.get(key))
        if (savedFilters[filterKey]) {
          key(savedFilters[filterKey])
        }
      }
    }
  }, [key, sessionData])

  useEffect(() => {
    const mapToValuesObject = (map) => {
      return Array.from(map.values()).reduce((acc, value) => {
        return { ...acc, ...value }
      }, {})
    }
    const sessionValuesObject = mapToValuesObject(sessionData)
    sessionStorage.setItem(key, JSON.stringify(sessionValuesObject))
  }, [key, dependencies, sessionData])
}
