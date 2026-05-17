<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import type { Todo } from '../types/todo'

defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  toggle: [id: string]
  remove: [id: string]
}>()
</script>

<template>
  <p v-if="todos.length === 0" class="empty-state">
    No todos yet.
  </p>

  <ul v-else class="todo-list" aria-label="Todo list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="emit('toggle', $event)"
      @remove="emit('remove', $event)"
    />
  </ul>
</template>
