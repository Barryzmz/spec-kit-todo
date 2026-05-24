# Data Model: Todo Size and Urgency

## Entity: Todo

Represents one user-created task, extended with work size and urgency.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique Todo identifier |
| `title` | `string` | Yes | Trimmed non-empty Todo text |
| `completed` | `boolean` | Yes | Whether the Todo is complete |
| `createdAt` | `string` | Yes | ISO timestamp created when the Todo is added |
| `size` | `TodoSize` | Yes | Work size classification |
| `urgency` | `TodoUrgency` | Yes | Integer urgency level from `1` through `5` |

### Validation Rules

- `id` must be a non-empty string.
- `title` must be trimmed before save.
- `title` must not be empty after trimming.
- `completed` must be boolean.
- `createdAt` must be a non-empty ISO timestamp string.
- `size` must be `big` or `small`.
- `urgency` must be an integer from `1` through `5`.
- Empty urgency is invalid when adding a Todo.
- Invalid urgency during edit does not replace the previous valid urgency.

### State Transitions

```text
New input(title, size, urgency) -> valid -> Todo(created, completed=false)
New input(empty urgency) -> invalid -> no Todo created
New input(urgency < 1 or > 5) -> invalid -> no Todo created
New input(non-integer urgency) -> invalid -> no Todo created

Todo(existing) -> edit valid size -> Todo(updated size)
Todo(existing) -> edit valid urgency -> Todo(updated urgency)
Todo(existing) -> edit invalid urgency -> Todo(previous urgency)
Todo(existing) -> edit blank title -> Todo(previous title)

completed=false -> toggle -> completed=true
completed=true -> toggle -> completed=false
Todo -> delete -> removed
```

## Type: TodoSize

Allowed values:

- `big`: big work
- `small`: small work

Default for existing saved Todos without a valid size:

- `small`

## Type: TodoUrgency

Allowed values:

- `1`: most urgent
- `2`
- `3`
- `4`
- `5`: least urgent

Default for existing saved Todos without a valid urgency:

- `5`

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

Example:

```json
[
  {
    "id": "todo-id",
    "title": "Write plan",
    "completed": false,
    "createdAt": "2026-05-24T00:00:00.000Z",
    "size": "small",
    "urgency": 5
  }
]
```

### Load Normalization

- Invalid or unreadable saved data resolves to an empty Todo list.
- Records with invalid base Todo fields are ignored by the existing validation path.
- Records with valid base Todo fields but missing or invalid `size` are loaded with
  `size: 'small'`.
- Records with valid base Todo fields but missing or invalid `urgency` are loaded
  with `urgency: 5`.
- Normalized values are saved back on the next Todo mutation.
