<script setup lang="ts">
import type { Todo } from '../types/todo'

defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  toggle: [id: string]
  remove: [id: string]
}>()
</script>

<template>
  <li class="todo-row" :class="{ 'todo-row-completed': todo.completed }">
    <label class="todo-check">
      <input
        class="todo-checkbox"
        type="checkbox"
        :checked="todo.completed"
        @change="emit('toggle', todo.id)"
      />
      <span class="todo-title">{{ todo.title }}</span>
    </label>

    <button
      class="todo-delete"
      type="button"
      :aria-label="`Delete ${todo.title}`"
      @click="emit('remove', todo.id)"
    >
      Delete
    </button>
  </li>
</template>
