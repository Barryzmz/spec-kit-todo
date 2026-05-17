<script setup lang="ts">
import { ref } from 'vue'
import { useTodos } from './composables/useTodos'
import TodoList from './components/TodoList.vue'

const newTodoTitle = ref('')
const { filteredTodos, addTodo, deleteTodo, toggleTodo } = useTodos()

function handleAddTodo() {
  const wasAdded = addTodo(newTodoTitle.value)

  if (wasAdded) {
    newTodoTitle.value = ''
  }
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
          <button class="todo-button" type="submit">Add</button>
        </div>
      </form>

      <TodoList
        :todos="filteredTodos"
        @toggle="toggleTodo"
        @remove="deleteTodo"
      />
    </section>
  </main>
</template>
