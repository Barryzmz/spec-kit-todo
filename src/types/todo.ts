export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
  size: TodoSize
  urgency: TodoUrgency
}

export type TodoFilter = 'all' | 'active' | 'completed'

export type TodoSize = 'big' | 'small'

export type TodoUrgency = 1 | 2 | 3 | 4 | 5

export interface TodoEditPayload {
  id: string
  title?: string
  size?: TodoSize
  urgency?: number | string
}
