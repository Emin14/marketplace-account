export type Advertisement = {
  /* Уникальный идентификатор. */
  id: string
  /* Название. */
  name: string
  /* Описание. */
  description?: string
  /* Цена. */
  price: number
  /* Дата и время создания. */
  createdAt: string
  /* Количество просмотров. */
  views: number
  /* Количество лайков. */
  likes: number
  /* Ссылка на изображение. */
  imageUrl?: string
}

export const OrderStatus = {
  Created: 0,
  Paid: 1,
  Transport: 2,
  DeliveredToThePoint: 3,
  Received: 4,
  Archived: 5,
  Refund: 6,
} as const

export type OrderStatusKeys = keyof typeof OrderStatus

export type OrderItem = Advertisement & { count: number }

export type Order = {
  /* Уникальный идентификатор. */
  id: string
  /* Статус. */
  status: (typeof OrderStatus)[keyof typeof OrderStatus]
  /* Дата и время создания. */
  createdAt: string
  /* Дата и время завершения. */
  finishedAt?: string
  /* Товары в заказе. */
  items: Array<OrderItem>
  /* Способ доставки(Почта, СДЭК...) */
  deliveryWay: string
  /* Сумма заказа */
  total: number
}

export type Image = {
  /* Уникальный идентификатор. */
  id: number
  /* Ссылка. */
  url: string
  /* Название. */
  name: string
}

export type InputsValue = Omit<
  Advertisement,
  'id' | 'createdAt' | 'views' | 'likes'
>

export type Filter = {
  name: string
  minPrice: string
  maxPrice: string
  minViews: string
  maxViews: string
  minLikes: string
  maxLikes: string
}

export interface Pagination {
  totalPages: number
  first: number
  items: number
  last: number
  next: number | null
}

export interface UseGetDataResult<T> {
  data: T[]
  pages: Pagination
  loading: boolean
  error: string
}
