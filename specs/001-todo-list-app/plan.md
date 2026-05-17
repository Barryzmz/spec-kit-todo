# Implementation Plan: Simple Todo List App

**Branch**: `001-todo-list-app` | **Date**: 2026-05-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-todo-list-app/spec.md`

**Note**: This plan defines implementation design only. It does not start code implementation.

## Summary

Build a single-page Todo List application in the existing `spec-kit-todo` Vite app.
Users can add, view, complete, reopen, edit, delete, filter, and clear completed
Todos. Todo data persists in the current browser through `localStorage` under the
key `spec-kit-todo-items`; the active filter is session UI state and is not persisted.

The implementation will use Vue 3, TypeScript, Vite, Composition API, small focused
components, one `useTodos` composable, and project-local CSS. It will not introduce
Pinia, Vue Router, backend APIs, databases, login, or large UI frameworks.

## Technical Context

**Language/Version**: TypeScript with Vue 3 on Vite

**Primary Dependencies**: Vue 3 only for runtime app behavior. No Pinia, Vue Router,
Element Plus, Bootstrap, or other large UI framework.

**Storage**: Browser `localStorage` only, key `spec-kit-todo-items`, storing only
the Todo array.

**Testing**: Manual acceptance validation from this plan and `npm run build`.
Automated tests are not required by the current spec.

**Target Platform**: Modern browsers with `localStorage`; Todo IDs prefer
`crypto.randomUUID()` and fall back to `Date.now().toString()`.

**Project Type**: Frontend single-page application.

**Performance Goals**: Interactions should feel immediate for typical local Todo
lists. Filtering is computed from in-memory state.

**Constraints**: Composition API, localStorage-only persistence, no backend/API,
no login/database, no Pinia, no Vue Router, no Element Plus/Bootstrap/large UI
framework, no drag-and-drop sorting, simple readable components.

**Scale/Scope**: Small learning-focused Todo application for one browser profile
on one device.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- PASS: Vue 3 + TypeScript + Vite are used for all application code.
- PASS: Components will use Composition API and `<script setup lang="ts">`.
- PASS: Todo data remains in browser localStorage; no backend, database, API, or login.
- PASS: Pinia is not introduced; state is handled by `useTodos`.
- PASS: Element Plus, Bootstrap, and other large UI frameworks are not introduced.
- PASS: Components are small and scoped to one responsibility.
- PASS: Acceptance criteria are mapped in the validation plan.
- PASS: Completion requires `npm run build`.

Post-design re-check: PASS. The data model, component design, persistence design,
and validation plan remain within all constitution constraints.

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-list-app/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-contract.md
|-- checklists/
|   |-- requirements.md
|   `-- requirements-review.md
`-- tasks.md
```

### Source Code (repository root)

```text
src/
|-- components/
|   |-- TodoFilter.vue
|   |-- TodoInput.vue
|   |-- TodoItem.vue
|   `-- TodoList.vue
|-- composables/
|   `-- useTodos.ts
|-- types/
|   `-- todo.ts
|-- App.vue
|-- main.ts
`-- style.css
```

**Structure Decision**: Use the existing Vite single-page app. Add only `types`,
`composables`, and focused Todo components under `src/`. Keep global layout styles
in `src/style.css`; component-specific styles may be scoped inside SFCs when clearer.

## Data Model

### Todo

Source file: `src/types/todo.ts`

```ts
export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export type TodoFilter = 'all' | 'active' | 'completed'
```

Fields:

- `id`: Unique string identifier. Generate with `crypto.randomUUID()` when available;
  otherwise use `Date.now().toString()`.
- `title`: Trimmed non-empty Todo text.
- `completed`: `false` when created; toggles between `true` and `false`.
- `createdAt`: ISO timestamp string generated at creation.

Validation rules:

- New Todo titles are trimmed before validation and save.
- Blank or whitespace-only new titles are rejected.
- Edited Todo titles are trimmed before validation and save.
- Blank or whitespace-only edits are rejected and the previous title is preserved.
- Duplicate titles are allowed because the spec does not forbid them.
- No maximum title length is enforced in v1; UI should remain readable for long text.

State transitions:

- Create: no Todo -> Todo with `completed: false`.
- Toggle complete: `completed: false` -> `true`.
- Toggle reopen: `completed: true` -> `false`.
- Edit: same `id`, `completed`, and `createdAt`; updated `title`.
- Delete: Todo removed from collection.
- Clear completed: all Todos with `completed: true` removed.

## Component Design

### `App.vue`

Responsibilities:

- Compose the Todo app shell.
- Call `useTodos()` once.
- Pass state and callbacks to child components.
- Keep top-level layout simple and readable.

Uses:

- `TodoInput`
- `TodoList`
- `TodoFilter`

### `src/components/TodoInput.vue`

Responsibilities:

- Own the text input for new Todo creation.
- Allow adding with Enter or an Add button.
- Trim input before emitting.
- Prevent empty trimmed titles from being submitted.
- Clear the input only after a successful submit.

Interface:

- Emits `add(title: string)`.

### `src/components/TodoList.vue`

Responsibilities:

- Receive `filteredTodos`.
- Render one `TodoItem` per Todo.
- Show empty-state text when there are no visible Todos.
- Forward item events upward.

Interface:

- Props: `todos: Todo[]`.
- Emits: `toggle(id)`, `remove(id)`, `edit(id, title)`.

### `src/components/TodoItem.vue`

Responsibilities:

- Render one Todo.
- Show completed state with a clear visual difference, such as line-through text
  and reduced opacity.
- Toggle complete/incomplete.
- Delete the Todo.
- Edit Todo text.
- Save edit on Enter.
- Cancel edit on Esc.
- Save edit on blur.
- Trim edited text.
- Preserve the old title when the trimmed edit is empty.

Interface:

- Props: `todo: Todo`.
- Emits: `toggle(id)`, `remove(id)`, `edit(id, title)`.

Edit behavior:

- Enter: save trimmed value if non-empty; close edit mode.
- Esc: restore the original title; close edit mode without saving.
- Blur: save trimmed value if non-empty; close edit mode.
- Blank edit: keep original title and close edit mode.

### `src/components/TodoFilter.vue`

Responsibilities:

- Show filter controls for `all`, `active`, and `completed`.
- Indicate the selected filter.
- Emit filter changes.
- Provide a clear-completed command.

Interface:

- Props: `currentFilter: TodoFilter`, `completedCount: number`.
- Emits: `update:filter(filter)`, `clearCompleted()`.

## State Management Design

Source file: `src/composables/useTodos.ts`

State:

- `todos`: `ref<Todo[]>([])`
- `currentFilter`: `ref<TodoFilter>('all')`
- `filteredTodos`: computed from `todos` and `currentFilter`
- `completedCount`: computed number of completed Todos
- `activeCount`: computed number of incomplete Todos

Actions:

- `addTodo(title: string)`: trim, reject blank, create Todo, persist.
- `deleteTodo(id: string)`: remove matching Todo, persist.
- `toggleTodo(id: string)`: flip `completed`, persist.
- `editTodo(id: string, title: string)`: trim, reject blank, preserve original
  title if blank, persist only when changed.
- `clearCompleted()`: remove completed Todos, persist.
- `setFilter(filter: TodoFilter)`: update UI filter only; do not persist.
- `loadTodos()`: read localStorage, validate shape, default to empty list on error.
- `saveTodos()`: write current Todo array to localStorage.

Design notes:

- Use a small composable instead of Pinia because state is local to one page.
- Keep all persistence in the composable so components remain presentation-focused.
- Use immutable array updates where they keep code simple and predictable.

## localStorage Persistence Design

Key: `spec-kit-todo-items`

Stored value:

```json
[
  {
    "id": "string",
    "title": "Buy milk",
    "completed": false,
    "createdAt": "2026-05-17T00:00:00.000Z"
  }
]
```

Rules:

- Load once when `useTodos()` initializes.
- Save after add, edit, toggle, delete, and clear-completed operations.
- Save only the Todo array.
- Do not save `currentFilter`.
- If saved JSON is missing, invalid, not an array, or contains invalid Todo
  records, fall back to an empty list.
- localStorage write failures should not break current in-memory interactions.

## User Flow

1. User opens the page.
2. `App.vue` initializes `useTodos()`.
3. `useTodos()` loads Todo records from `localStorage`.
4. User enters Todo text in `TodoInput`.
5. User presses Enter or the Add button.
6. Input trims text; blank text is rejected.
7. A valid Todo is added with `completed: false`, displayed in `TodoList`, and saved.
8. User toggles a Todo complete or incomplete from `TodoItem`.
9. User edits a Todo from `TodoItem`; Enter saves, Esc cancels, blur saves.
10. User deletes a Todo from `TodoItem`.
11. User changes filters in `TodoFilter` between all, active, and completed.
12. User clears all completed Todos from `TodoFilter`.
13. User refreshes the page.
14. The Todo list reloads from `localStorage`; filter resets to `all`.

## Testing / Manual Validation Plan

Manual acceptance checks:

1. Add `Buy milk`; the Todo appears in the list.
2. Try to add spaces only; no Todo appears.
3. Add `  Walk dog  `; saved text is `Walk dog`.
4. After successful add, the input field is empty.
5. Add multiple Todos and confirm all are visible.
6. Toggle a Todo complete; it has a clear completed visual state.
7. Toggle the same Todo again; it returns to incomplete visual state.
8. Edit a Todo and press Enter; the new trimmed text is shown.
9. Edit a Todo and press Esc; the original text remains.
10. Edit a Todo and blur the field; the new trimmed text is shown.
11. Edit a Todo to spaces only; the original text remains.
12. Delete a Todo; it is removed from all relevant filters.
13. Switch to all; all Todos are shown.
14. Switch to active; only incomplete Todos are shown.
15. Switch to completed; only completed Todos are shown.
16. Clear completed; completed Todos are removed and active Todos remain.
17. Refresh the page; Todo titles and completion states remain.
18. Confirm the filter resets to all after refresh.
19. Run `npm run build`; it must pass.

## Implementation Phases

### Phase 0: Research

- Confirm no unresolved technology or product clarifications remain.
- Record decisions for state management, persistence, component split, and validation.

### Phase 1: Data and State Foundation

- Create `src/types/todo.ts`.
- Create `src/composables/useTodos.ts`.
- Implement ID creation, localStorage load/save, validation, filter computation,
  and Todo mutations.

### Phase 2: Component Structure

- Replace starter app content in `App.vue`.
- Create `TodoInput.vue`, `TodoList.vue`, `TodoItem.vue`, and `TodoFilter.vue`.
- Wire props and emits through `App.vue`.

### Phase 3: Interaction Completion

- Implement add, toggle, edit, delete, filtering, and clear-completed flows.
- Implement Enter, Esc, and blur edit behavior.
- Add empty states and selected filter indication.

### Phase 4: Styling and Accessibility Pass

- Add project-local CSS or scoped CSS.
- Make completed state visually clear.
- Ensure labels, buttons, focus states, and keyboard flows are usable.
- Keep layout responsive for common mobile and desktop widths.

### Phase 5: Validation

- Run manual acceptance checks.
- Run `npm run build`.
- Fix any issues before implementation is considered complete.

## Complexity Tracking

No constitution violations. No additional complexity justification is required.
