import { computed, ref } from 'vue'
import type { Todo, TodoFilter } from '../types/todo'

const STORAGE_KEY = 'spec-kit-todo-items'

function createTodoId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return Date.now().toString()
}

function isTodo(value: unknown): value is Todo {
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

function loadTodos(): Todo[] {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY)

    if (!storedTodos) {
      return []
    }

    const parsedTodos: unknown = JSON.parse(storedTodos)

    if (!Array.isArray(parsedTodos) || !parsedTodos.every(isTodo)) {
      return []
    }

    return parsedTodos
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

  function addTodo(title: string): boolean {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return false
    }

    todos.value = [
      ...todos.value,
      {
        id: createTodoId(),
        title: trimmedTitle,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]

    saveTodos(todos.value)
    return true
  }

  return {
    todos,
    currentFilter,
    filteredTodos,
    completedCount,
    activeCount,
    addTodo,
  }
}
