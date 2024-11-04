import { isValid, format, parseISO } from 'date-fns'

export const getReadableDate = (utcDate: string | undefined): string => {
  if (!utcDate) {
    return 'Invalid Date'
  }

  const parsedDate = parseISO(utcDate)
  const isValidDate = isValid(parsedDate)
  if (isValidDate) {
    // parsedDate is a `Date` object, so you can use it directly,
    // instead of `new Date(utcDate)`
    const messageDate = format(parsedDate, 'dd/MM HH:mm')
    return messageDate
  } else {
    return 'InvalidDate'
  }
}

export const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

export const getPrevDate = (prevDays: number) => {
  const date = new Date()
  if (prevDays) {
    date.setDate(date.getDate() - prevDays)
  }
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const formattedDate = `${day}-${month}`
  return formattedDate
}

export const getNextDate = (prevDays: number) => {
  const date = new Date()
  if (prevDays) {
    date.setDate(date.getDate() + prevDays)
  }
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const formattedDate = `${day}-${month}`
  return formattedDate
}

export const getPrevDateWithYear = (prevDays: number) => {
  const date = new Date()
  if (prevDays) {
    date.setDate(date.getDate() - prevDays)
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

export const getNextDateWithYear = (prevDays: number) => {
  const date = new Date()
  if (prevDays) {
    date.setDate(date.getDate() + prevDays)
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}
