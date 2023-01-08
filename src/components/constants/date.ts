const date = new Date()
const day = date.getDate()
const month = date.getMonth()
const year = date.getFullYear()


export  let currentDate: string
export const configCurrentDate = () => {
    if(month < 10 ) {
        currentDate = `${year}-0${month + 1}-${day}`
    }
    if (day < 10) {
        currentDate = `${year}-${month + 1}-0${day}`
    }
    if(month < 10 && day < 10) {
        currentDate = `${year}-0${month + 1}-0${day}`
    } else {
        currentDate = `${year}-${month + 1}-${day}`
    }
}


