# Data Model: Simple Todo List App

## Entity: Todo

Represents one user-created task.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique Todo identifier |
| `title` | `string` | Yes | Trimmed non-empty Todo text |
| `completed` | `boolean` | Yes | Whether the Todo is complete |
| `createdAt` | `string` | Yes | ISO timestamp created when the Todo is added |

### Validation Rules

- `id` must be a non-empty string.
- `title` must be trimmed before save.
- `title` must not be empty after trimming.
- `completed` must be boolean.
- `createdAt` must be a non-empty ISO timestamp string.

### State Transitions

```text
New input -> Todo(created, completed=false)
completed=false -> toggle -> completed=true
completed=true -> toggle -> completed=false
Todo(existing title) -> edit valid title -> Todo(updated title)
Todo(existing title) -> edit blank title -> Todo(existing title)
Todo -> delete -> removed
Completed Todos -> clear completed -> removed
```

## Entity: TodoFilter

Represents the current visible subset of Todos.

Allowed values:

- `all`: all Todos
- `active`: Todos where `completed` is `false`
- `completed`: Todos where `completed` is `true`

### Persistence

- `TodoFilter` is UI state only.
- It is not saved to localStorage.
- It resets to `all` when the app loads.

## localStorage Record

Key: `spec-kit-todo-items`

Value: serialized `Todo[]`.

Invalid or unreadable saved data resolves to an empty Todo list.
