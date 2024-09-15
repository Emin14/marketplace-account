import { OrderStatus } from '../types'

export function getOrderStatusText(status: number): string | undefined {
  return Object.keys(OrderStatus).find(
    (key) => OrderStatus[key as keyof typeof OrderStatus] === status,
  )
}
