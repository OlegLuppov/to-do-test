export type Todo = {
  id: number
  title: string
  date: string
  completed: boolean
  classCompletedContent: string
  isPTag: boolean
  dateWarning: string
}

export type Todos = {
  todos: Todo[]
}
