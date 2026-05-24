<script setup lang="ts">
import { ref } from 'vue'
import { useTodos } from './composables/useTodos'
import TodoList from './components/TodoList.vue'
import type { TodoFilter, TodoSize } from './types/todo'

const newTodoTitle = ref('')
const newTodoSize = ref<TodoSize>('small')
const newTodoUrgency = ref('')
const addError = ref('')
const {
  activeCount,
  completedCount,
  currentFilter,
  filteredTodos,
  addTodo,
  clearCompleted,
  deleteTodo,
  editTodo,
  setFilter,
  toggleTodo,
} = useTodos()

const filterOptions: Array<{ value: TodoFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

function handleAddTodo() {
  const wasAdded = addTodo(
    newTodoTitle.value,
    newTodoSize.value,
    newTodoUrgency.value,
  )

  if (wasAdded) {
    newTodoTitle.value = ''
    newTodoUrgency.value = ''
    addError.value = ''
    return
  }

  addError.value = 'Enter a title and an urgency from 1 to 5.'
}
</script>

<template>
  <main class="todo-app" aria-labelledby="todo-title">
    <section class="todo-panel">
      <header class="todo-header">
        <h1 id="todo-title">spec-kit-todo</h1>
        <p>Simple Todo List</p>
      </header>

      <form class="todo-form" @submit.prevent="handleAddTodo">
        <label class="todo-label" for="todo-input">New Todo</label>
        <div class="todo-entry">
          <input
            id="todo-input"
            v-model="newTodoTitle"
            class="todo-input"
            type="text"
            placeholder="Add a todo"
          />
          <select
            v-model="newTodoSize"
            class="todo-select"
            aria-label="Work size"
          >
            <option value="small">Small</option>
            <option value="big">Big</option>
          </select>
          <input
            v-model="newTodoUrgency"
            class="todo-urgency-input"
            type="number"
            min="1"
            max="5"
            step="1"
            placeholder="1-5"
            aria-label="Urgency"
          />
          <button class="todo-button" type="submit">Add</button>
        </div>
        <p v-if="addError" class="todo-error" role="alert">
          {{ addError }}
        </p>
      </form>

      <div class="todo-toolbar" aria-label="Todo filters">
        <div class="todo-filters">
          <button
            v-for="filter in filterOptions"
            :key="filter.value"
            class="todo-filter"
            :class="{ 'todo-filter-active': currentFilter === filter.value }"
            type="button"
            @click="setFilter(filter.value)"
          >
            {{ filter.label }}
          </button>
        </div>

        <button
          class="todo-clear"
          type="button"
          :disabled="completedCount === 0"
          @click="clearCompleted"
        >
          Clear completed
        </button>
      </div>

      <p class="todo-counts">
        {{ activeCount }} active / {{ completedCount }} completed
      </p>

      <TodoList
        :todos="filteredTodos"
        @edit="editTodo"
        @toggle="toggleTodo"
        @remove="deleteTodo"
      />
    </section>
  </main>
</template>
