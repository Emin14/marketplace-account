import { orderStatus } from '../assets/orderStatus'

export function ordersFilterConverter(obj) {
  const result = []

  for (let element of Object.keys(obj)) {
    if (!obj[element]) {
      continue
    }

    result.push(`&status=${orderStatus[element]}`)
  }

  return result.join('')
}
