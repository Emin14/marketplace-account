export function formatDate(isoDate: string) {
  const date = new Date(isoDate)

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }

  return date.toLocaleString('ru-RU', options).replace(',', ' в')
}
