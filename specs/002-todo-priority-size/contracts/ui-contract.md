# UI Contract: Todo Size and Urgency

This feature has no backend API contracts. This document defines component-level
contracts for the single-page UI.

## Shared Types

```ts
type TodoSize = 'big' | 'small'
type TodoUrgency = 1 | 2 | 3 | 4 | 5
```

The implementation may use `number` for form input while validating and converting
to `TodoUrgency` before saving.

## `App.vue`

Responsibilities:

- Own add-form input state for title, size, and urgency.
- Call `useTodos.addTodo` with validated form values or handle a rejected add.
- Clear form fields only after a successful add.
- Render validation feedback when title or urgency is invalid.
- Pass Todo arrays and event handlers to list components.

Behavior contract:

- Empty or whitespace-only title does not add a Todo.
- Empty urgency does not add a Todo and shows or preserves validation feedback.
- Urgency below `1`, above `5`, or non-integer does not add a Todo.
- Successful add clears the title input and stores the selected size/urgency.

## `TodoList.vue`

Props:

- `todos: Todo[]`

Emits:

- `toggle(id: string)`
- `remove(id: string)`
- `edit(payload: TodoEditPayload)`

Behavior contract:

- Renders the provided Todos in order.
- Shows empty-state text when `todos` is empty.
- Forwards item events without mutating state directly.
- Displays each Todo's size and urgency through `TodoItem`.

## `TodoItem.vue`

Props:

- `todo: Todo`

Emits:

- `toggle(id: string)`
- `remove(id: string)`
- `edit(payload: TodoEditPayload)`

Suggested payload:

```ts
interface TodoEditPayload {
  id: string
  title?: string
  size?: TodoSize
  urgency?: number
}
```

Behavior contract:

- Toggle control emits `toggle`.
- Delete control emits `remove`.
- Display mode shows Todo title, size, urgency, and completion state.
- Completed state remains visually distinct.
- Edit mode allows changing title, size, and urgency.
- Enter during edit saves valid edits.
- Esc during edit cancels without emitting changes.
- Blur during edit saves valid edits.
- Blank trimmed title preserves the original title.
- Invalid urgency preserves the previous valid urgency.

## `useTodos`

Returned state:

- `todos`
- `currentFilter`
- `filteredTodos`
- existing counts used by the app

Returned actions:

- `addTodo(title: string, size: TodoSize, urgency: number): boolean`
- `deleteTodo(id: string): void`
- `toggleTodo(id: string): void`
- `editTodo(payload: TodoEditPayload): boolean`

Behavior contract:

- Adds only Todos with non-empty title, valid size, and integer urgency `1` through `5`.
- Persists `size` and `urgency` with each Todo.
- Normalizes existing saved Todos without size or urgency to `small` and `5`.
- Does not persist `currentFilter`.
- Does not introduce API calls or global store behavior.
