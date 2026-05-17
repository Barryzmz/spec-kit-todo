# UI Contract: Simple Todo List App

This feature has no backend API contracts. This document defines component-level
contracts for the single-page UI.

## `TodoInput`

Props: none.

Emits:

- `add(title: string)`: emitted only when the trimmed title is non-empty.

Behavior contract:

- Enter submits.
- Add button submits.
- Successful submit clears the input.
- Blank trimmed value does not emit.

## `TodoList`

Props:

- `todos: Todo[]`

Emits:

- `toggle(id: string)`
- `remove(id: string)`
- `edit(id: string, title: string)`

Behavior contract:

- Renders the provided Todos in order.
- Shows empty-state text when `todos` is empty.
- Forwards item events without mutating state directly.

## `TodoItem`

Props:

- `todo: Todo`

Emits:

- `toggle(id: string)`
- `remove(id: string)`
- `edit(id: string, title: string)`

Behavior contract:

- Toggle control emits `toggle`.
- Delete control emits `remove`.
- Enter during edit emits `edit` for a valid trimmed title.
- Esc during edit cancels without emitting `edit`.
- Blur during edit emits `edit` for a valid trimmed title.
- Blank trimmed edit preserves original content.

## `TodoFilter`

Props:

- `currentFilter: TodoFilter`
- `completedCount: number`

Emits:

- `update:filter(filter: TodoFilter)`
- `clearCompleted()`

Behavior contract:

- Shows `all`, `active`, and `completed` filter options.
- Indicates the currently selected filter.
- Clear completed emits `clearCompleted`.
