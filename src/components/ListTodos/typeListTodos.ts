export type TypeListTodos = {
    id:number
    title:string
    date:string
}

export type TypeTodos = {
    todos:TypeListTodos[]
    className:string
}