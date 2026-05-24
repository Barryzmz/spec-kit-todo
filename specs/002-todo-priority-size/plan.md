# Implementation Plan: Todo Size and Urgency

**Branch**: `002-todo-priority-size` | **Date**: 2026-05-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-todo-priority-size/spec.md`

## Summary

Extend the existing Todo app so each Todo stores and displays a work size and urgency.
Users choose size and urgency when adding a Todo, can edit both values later, and the
values persist in the existing `spec-kit-todo-items` localStorage record. Existing
saved Todos without the new fields are normalized on load to small work and urgency
`5`.

The implementation keeps the current Vue 3 + TypeScript + Vite single-page app,
uses Composition API and the existing `useTodos` composable, and does not introduce
Pinia, Vue Router, backend APIs, databases, login, or large UI frameworks.

## Technical Context

**Language/Version**: TypeScript with Vue 3 on Vite

**Primary Dependencies**: Vue 3 only; no Pinia, Vue Router, Element Plus, Bootstrap,
or other large UI framework

**Storage**: Browser localStorage only, existing key `spec-kit-todo-items`

**Testing**: Manual acceptance validation plus `npm.cmd run build`

**Target Platform**: Modern browsers supported by the existing Vite app

**Project Type**: Frontend single-page application

**Performance Goals**: Responsive interactions for typical local Todo lists; no
network or server latency

**Constraints**: Composition API, localStorage-only persistence, no backend/API,
no login/database, no global store, no large UI framework

**Scale/Scope**: Small learning-focused Todo application with incremental data-model
extension

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Vue 3 + TypeScript + Vite are used for all application code. PASS
- Vue components use Composition API, preferably `<script setup lang="ts">`. PASS
- Todo data remains in browser localStorage; no backend, database, API, or login. PASS
- Pinia is not introduced. PASS
- Element Plus, Bootstrap, and other large UI frameworks are not introduced. PASS
- Components remain simple, readable, and scoped to the feature. PASS
- Acceptance criteria are explicit and independently verifiable. PASS
- Completion includes validating acceptance scenarios and passing `npm.cmd run build`. PASS

## Project Structure

### Documentation (this feature)

```text
specs/002-todo-priority-size/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-contract.md
`-- checklists/
    `-- requirements.md
```

### Source Code (repository root)

```text
src/
|-- components/
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

**Structure Decision**: Keep the existing app structure. Extend `src/types/todo.ts`
for the new `TodoSize` and urgency fields, extend `useTodos` for validation and
normalization, and update the existing Todo components rather than adding a global
store or routing layer.

## Data Model

The existing `Todo` entity gains two required fields:

- `size: TodoSize`
- `urgency: TodoUrgency`

`TodoSize` is a union of `big` and `small`. `TodoUrgency` is an integer from `1`
through `5`, where `1` is most urgent and `5` is least urgent.

Existing localStorage records missing either new field are normalized during load:

- missing or invalid `size` -> `small`
- missing or invalid `urgency` -> `5`

## Component Design

- `App.vue`: owns form-level input state for adding Todos, passes add requests to
  `useTodos`, and renders validation feedback for invalid title or urgency.
- `TodoList.vue`: receives the filtered Todo array and forwards toggle, remove, and
  edit events from each item.
- `TodoItem.vue`: displays title, completion state, work size, and urgency. The edit
  flow allows changing title, size, and urgency while preserving existing behavior
  for Enter save, Esc cancel, and blur save.

No new large component hierarchy is needed. A separate `TodoInput.vue` can be added
later if the full feature-001 component split is resumed, but this feature can be
planned against the current codebase without requiring that refactor first.

## State Management Design

`useTodos` remains the single state boundary for Todo data and persistence.

Required additions:

- Validate add payloads with title, size, and urgency.
- Validate edit payloads for title, size, and urgency.
- Preserve previous Todo values when an edit payload is invalid.
- Normalize saved Todos when loading from localStorage.
- Save the full Todo array, including `size` and `urgency`, after add/edit/toggle/delete.

The existing `currentFilter` remains UI state and is not saved to localStorage.
This feature does not add sorting or new filters.

## localStorage Persistence Design

Storage key remains `spec-kit-todo-items`.

Stored value remains serialized `Todo[]`, now with the extended fields:

```json
[
  {
    "id": "todo-id",
    "title": "Example",
    "completed": false,
    "createdAt": "2026-05-24T00:00:00.000Z",
    "size": "small",
    "urgency": 5
  }
]
```

Load behavior:

1. Parse the stored value as an array.
2. Keep valid existing Todo identity, title, completion, and createdAt fields.
3. Default missing or invalid `size` to `small`.
4. Default missing or invalid `urgency` to `5`.
5. Drop unreadable or structurally invalid records only when the base Todo fields
   are invalid.

## User Flow

1. User opens the page.
2. App loads Todos from localStorage and normalizes missing size/urgency fields.
3. User enters Todo title, selects big or small work, and enters urgency from `1`
   through `5`.
4. If title is blank or urgency is empty/invalid, no Todo is added and validation
   feedback remains visible.
5. If valid, Todo is added, displayed with size and urgency, and saved.
6. User can toggle completion or delete the Todo as before.
7. User can edit title, size, and urgency.
8. Invalid edit urgency preserves the previous valid urgency.
9. Refreshing the page restores Todo title, completion, size, and urgency.

## Testing / Manual Validation Plan

Manual validation is documented in [quickstart.md](./quickstart.md). The critical
checks are:

- Add big work with urgency `1`; list displays both values.
- Add small work with urgency `5`; list displays both values.
- Empty urgency, urgency `0`, urgency `6`, and non-integer urgency are rejected.
- Editing size and urgency updates the list.
- Invalid edit urgency preserves the previous valid urgency.
- Existing Todos without size/urgency load as small work and urgency `5`.
- Refresh preserves size and urgency.
- `npm.cmd run build` passes.

## Implementation Phases

### Phase 0: Research

Resolve decisions for state extension, urgency validation, and localStorage
normalization. Output: [research.md](./research.md).

### Phase 1: Design

Define the extended Todo model, UI contracts, and quickstart validation flow.
Outputs: [data-model.md](./data-model.md), [contracts/ui-contract.md](./contracts/ui-contract.md),
and [quickstart.md](./quickstart.md).

### Phase 2: Task Planning

Generate dependency-ordered tasks that first update types and composable logic, then
update UI components, then validate persistence and build.

### Phase 3: Implementation

Implement only after tasks are generated and reviewed. Keep changes scoped to Todo
types, `useTodos`, existing components, and local CSS.

## Complexity Tracking

No constitution violations.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | Not applicable | Not applicable |
