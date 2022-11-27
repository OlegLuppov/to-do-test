export type Todo = {
  id: number
  title: string
  date: string
  completed: boolean
  classCompletedContent: string
  isPTag: boolean
  isSpanTag: boolean
  dateWarning: string
  file: string
}

export type Todos = {
  todos: Todo[]
}
