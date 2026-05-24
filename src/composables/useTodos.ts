import { computed, ref } from 'vue'
import type {
  Todo,
  TodoEditPayload,
  TodoFilter,
  TodoSize,
  TodoUrgency,
} from '../types/todo'

const STORAGE_KEY = 'spec-kit-todo-items'
const DEFAULT_TODO_SIZE: TodoSize = 'small'
const DEFAULT_TODO_URGENCY: TodoUrgency = 5

function createTodoId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return Date.now().toString()
}

function isTodoSize(value: unknown): value is TodoSize {
  return value === 'big' || value === 'small'
}

function normalizeTodoSize(value: unknown): TodoSize {
  return isTodoSize(value) ? value : DEFAULT_TODO_SIZE
}

function parseTodoUrgency(value: unknown): TodoUrgency | null {
  const parsedValue =
    typeof value === 'string' && value.trim() !== '' ? Number(value) : value

  if (
    Number.isInteger(parsedValue) &&
    typeof parsedValue === 'number' &&
    parsedValue >= 1 &&
    parsedValue <= 5
  ) {
    return parsedValue as TodoUrgency
  }

  return null
}

function isTodoUrgency(value: unknown): value is TodoUrgency {
  return parseTodoUrgency(value) !== null
}

function normalizeTodoUrgency(value: unknown): TodoUrgency {
  return parseTodoUrgency(value) ?? DEFAULT_TODO_URGENCY
}

function isBaseTodo(value: unknown): value is Omit<Todo, 'size' | 'urgency'> {
  if (!value || typeof value !== 'object') {
    return false
  }

  const todo = value as Record<string, unknown>

  return (
    typeof todo.id === 'string' &&
    todo.id.trim().length > 0 &&
    typeof todo.title === 'string' &&
    todo.title.trim().length > 0 &&
    typeof todo.completed === 'boolean' &&
    typeof todo.createdAt === 'string' &&
    todo.createdAt.trim().length > 0
  )
}

function normalizeTodo(value: unknown): Todo | null {
  if (!isBaseTodo(value)) {
    return null
  }

  const todo = value as Record<string, unknown> & Omit<Todo, 'size' | 'urgency'>

  return {
    id: todo.id,
    title: todo.title.trim(),
    completed: todo.completed,
    createdAt: todo.createdAt,
    size: normalizeTodoSize(todo.size),
    urgency: normalizeTodoUrgency(todo.urgency),
  }
}

function loadTodos(): Todo[] {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY)

    if (!storedTodos) {
      return []
    }

    const parsedTodos: unknown = JSON.parse(storedTodos)

    if (!Array.isArray(parsedTodos)) {
      return []
    }

    return parsedTodos
      .map((todo) => normalizeTodo(todo))
      .filter((todo): todo is Todo => todo !== null)
  } catch {
    return []
  }
}

function saveTodos(todos: Todo[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // Keep in-memory state usable if browser storage is unavailable.
  }
}

export function useTodos() {
  const todos = ref<Todo[]>(loadTodos())
  const currentFilter = ref<TodoFilter>('all')

  const filteredTodos = computed(() => {
    if (currentFilter.value === 'active') {
      return todos.value.filter((todo) => !todo.completed)
    }

    if (currentFilter.value === 'completed') {
      return todos.value.filter((todo) => todo.completed)
    }

    return todos.value
  })

  const completedCount = computed(
    () => todos.value.filter((todo) => todo.completed).length,
  )
  const activeCount = computed(
    () => todos.value.filter((todo) => !todo.completed).length,
  )

  function addTodo(title: string, size: TodoSize, urgency: number | string): boolean {
    const trimmedTitle = title.trim()
    const parsedUrgency = parseTodoUrgency(urgency)

    if (!trimmedTitle || !isTodoSize(size) || parsedUrgency === null) {
      return false
    }

    todos.value = [
      ...todos.value,
      {
        id: createTodoId(),
        title: trimmedTitle,
        completed: false,
        createdAt: new Date().toISOString(),
        size,
        urgency: parsedUrgency,
      },
    ]

    saveTodos(todos.value)
    return true
  }

  function deleteTodo(id: string) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
    saveTodos(todos.value)
  }

  function toggleTodo(id: string) {
    todos.value = todos.value.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    )
    saveTodos(todos.value)
  }

  function setFilter(filter: TodoFilter) {
    currentFilter.value = filter
  }

  function clearCompleted() {
    todos.value = todos.value.filter((todo) => !todo.completed)
    saveTodos(todos.value)
  }

  function editTodo(payload: TodoEditPayload): boolean {
    let wasEdited = false

    todos.value = todos.value.map((todo) => {
      if (todo.id !== payload.id) {
        return todo
      }

      const nextTitle =
        payload.title === undefined || payload.title.trim() === ''
          ? todo.title
          : payload.title.trim()
      const nextSize =
        payload.size === undefined || !isTodoSize(payload.size)
          ? todo.size
          : payload.size
      const nextUrgency =
        payload.urgency === undefined
          ? todo.urgency
          : parseTodoUrgency(payload.urgency) ?? todo.urgency

      wasEdited = true

      return {
        ...todo,
        title: nextTitle,
        size: nextSize,
        urgency: nextUrgency,
      }
    })

    if (wasEdited) {
      saveTodos(todos.value)
    }

    return wasEdited
  }

  return {
    todos,
    currentFilter,
    filteredTodos,
    completedCount,
    activeCount,
    addTodo,
    clearCompleted,
    deleteTodo,
    editTodo,
    isTodoSize,
    isTodoUrgency,
    setFilter,
    toggleTodo,
  }
}
