const date = new Date()
const day = date.getDate()
const month = date.getMonth()
const year = date.getFullYear()

export const currentDate = `${year}-0${month + 1}-0${day}`
