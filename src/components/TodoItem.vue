<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { Todo, TodoEditPayload, TodoSize } from '../types/todo'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  edit: [payload: TodoEditPayload]
  toggle: [id: string]
  remove: [id: string]
}>()

const isEditing = ref(false)
const editTitle = ref('')
const editSize = ref<TodoSize>('small')
const editUrgency = ref('')
const editForm = ref<HTMLFormElement | null>(null)
const titleInput = ref<HTMLInputElement | null>(null)

function sizeLabel(size: TodoSize) {
  return size === 'big' ? 'Big' : 'Small'
}

function startEditing() {
  editTitle.value = props.todo.title
  editSize.value = props.todo.size
  editUrgency.value = props.todo.urgency.toString()
  isEditing.value = true

  nextTick(() => titleInput.value?.focus())
}

function cancelEditing() {
  isEditing.value = false
}

function saveEditing() {
  emit('edit', {
    id: props.todo.id,
    title: editTitle.value,
    size: editSize.value,
    urgency: editUrgency.value,
  })
  isEditing.value = false
}

function handleFocusOut(event: FocusEvent) {
  if (!isEditing.value) {
    return
  }

  const nextTarget = event.relatedTarget

  if (
    nextTarget instanceof Node &&
    editForm.value?.contains(nextTarget)
  ) {
    return
  }

  saveEditing()
}
</script>

<template>
  <li class="todo-row" :class="{ 'todo-row-completed': todo.completed }">
    <form
      v-if="isEditing"
      ref="editForm"
      class="todo-edit-form"
      @submit.prevent="saveEditing"
      @keydown.esc.prevent="cancelEditing"
      @focusout="handleFocusOut"
    >
      <input
        ref="titleInput"
        v-model="editTitle"
        class="todo-input todo-edit-title"
        type="text"
        aria-label="Edit todo title"
      />
      <select
        v-model="editSize"
        class="todo-select"
        aria-label="Edit work size"
      >
        <option value="small">Small</option>
        <option value="big">Big</option>
      </select>
      <input
        v-model="editUrgency"
        class="todo-urgency-input"
        type="number"
        min="1"
        max="5"
        step="1"
        aria-label="Edit urgency"
      />
      <button class="todo-save" type="submit">Save</button>
      <button class="todo-cancel" type="button" @click="cancelEditing">
        Cancel
      </button>
    </form>

    <template v-else>
      <label class="todo-check">
        <input
          class="todo-checkbox"
          type="checkbox"
          :checked="todo.completed"
          @change="emit('toggle', todo.id)"
        />
        <span class="todo-content">
          <span class="todo-title">{{ todo.title }}</span>
          <span class="todo-meta">
            <span class="todo-badge">{{ sizeLabel(todo.size) }}</span>
            <span class="todo-badge">Urgency {{ todo.urgency }}</span>
          </span>
        </span>
      </label>

      <div class="todo-actions">
        <button class="todo-edit" type="button" @click="startEditing">
          Edit
        </button>
        <button
          class="todo-delete"
          type="button"
          :aria-label="`Delete ${todo.title}`"
          @click="emit('remove', todo.id)"
        >
          Delete
        </button>
      </div>
    </template>
  </li>
</template>
