import { OrderStatus, OrderStatusKeys } from '../types'

export function ordersFilterConverter(
  obj: Partial<Record<OrderStatusKeys, boolean>>,
  OrderStatusobj: typeof OrderStatus,
) {
  const result = []

  const [key] = Object.keys(obj).filter((key) => obj[key as OrderStatusKeys])

  if (key) {
    result.push(`&status=${OrderStatusobj[key as OrderStatusKeys]}`)
  }
  return result.join('')
}
