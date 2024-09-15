import { Filter } from '../types'

export function filterConverter(obj: Filter) {
  const result = []

  for (let element of Object.keys(obj)) {
    if (!obj[element as keyof Filter]) {
      continue
    }

    if (element === 'name') {
      result.push(`&name=${obj[element]}`)
    }
    if (element === 'minPrice') {
      result.push(`&price_gte=${obj[element]}`)
    }

    if (element === 'maxPrice') {
      result.push(`&price_lte=${obj[element]}`)
    }

    if (element === 'minViews') {
      result.push(`&views_gte=${obj[element]}`)
    }
    if (element === 'maxViews') {
      result.push(`&views_lte=${obj[element]}`)
    }
    if (element === 'minLikes') {
      result.push(`&likes_gte=${obj[element]}`)
    }
    if (element === 'maxLikes') {
      result.push(`&likes_lte=${obj[element]}`)
    }
  }

  return result.join('')
}
