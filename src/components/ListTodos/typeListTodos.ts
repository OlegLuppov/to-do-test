export type TypeListTodos = {
  id: number
  title: string
  date: string
  completed: boolean
  classCompletedContent: string
  isPTag: boolean
  dateWarning: string
}

export type TypeTodos = {
  todos: TypeListTodos[]
}
