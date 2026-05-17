---

description: "Task list for Simple Todo List App implementation"
---

# Tasks: Simple Todo List App

**Input**: Design documents from `/specs/001-todo-list-app/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md, quickstart.md

**Tests**: Automated tests are not required by the current specification. Each phase includes manual validation and `npm run build` gates.

**Organization**: Tasks are ordered for beginner-friendly implementation. Foundational type and composable work comes before components; core behavior comes before styling polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel after prerequisite tasks are complete and touches different files
- **[Story]**: Maps task to user stories from `spec.md`
- Each task includes an exact file path or command target

## Phase 1: Project Cleanup and Basic Preparation

**Purpose**: Confirm the existing Vue + TypeScript + Vite project is healthy, remove starter example content, and prepare folders.

- [ ] T001 Run `npm.cmd run build` from repository root to confirm the current Vue + TypeScript + Vite project builds before changes
- [ ] T002 Remove unused starter component usage from `src/App.vue` while keeping the app temporarily buildable
- [ ] T003 Remove unused starter imports and references from `src/main.ts`
- [ ] T004 Clean Vite starter styles from `src/style.css` and leave a minimal app-safe baseline
- [ ] T005 Create feature folders `src/types`, `src/composables`, and `src/components`
- [ ] T006 Run `npm.cmd run build` from repository root to confirm cleanup and folder preparation did not break the project

**Checkpoint**: Project is clean, folders exist, and build passes.

---

## Phase 2: Data Types and State Logic

**Purpose**: Create shared Todo types and the `useTodos` composable that all UI stories depend on.

**CRITICAL**: Complete this phase before creating Todo components.

- [ ] T007 Create `Todo` interface with `id`, `title`, `completed`, and `createdAt` fields in `src/types/todo.ts`
- [ ] T008 Create `TodoFilter` union type with `all`, `active`, and `completed` values in `src/types/todo.ts`
- [ ] T009 Create `useTodos` composable shell exporting `useTodos()` in `src/composables/useTodos.ts`
- [ ] T010 Implement `todos` state as `ref<Todo[]>([])` in `src/composables/useTodos.ts`
- [ ] T011 Implement `currentFilter` state with default `all` in `src/composables/useTodos.ts`
- [ ] T012 Implement `filteredTodos`, `completedCount`, and `activeCount` computed values in `src/composables/useTodos.ts`
- [ ] T013 Implement Todo ID creation using `crypto.randomUUID()` with `Date.now().toString()` fallback in `src/composables/useTodos.ts`
- [ ] T014 Implement `addTodo(title: string)` with trim, blank rejection, `completed: false`, `createdAt`, and persistence in `src/composables/useTodos.ts`
- [ ] T015 Implement `deleteTodo(id: string)` in `src/composables/useTodos.ts`
- [ ] T016 Implement `toggleTodo(id: string)` for complete and incomplete transitions in `src/composables/useTodos.ts`
- [ ] T017 Implement `editTodo(id: string, title: string)` with trim, blank rejection, original-title preservation, and persistence in `src/composables/useTodos.ts`
- [ ] T018 Implement `clearCompleted()` in `src/composables/useTodos.ts`
- [ ] T019 Implement `setFilter(filter: TodoFilter)` without localStorage persistence in `src/composables/useTodos.ts`
- [ ] T020 Implement `loadTodos()` using localStorage key `spec-kit-todo-items` with invalid-data fallback to an empty list in `src/composables/useTodos.ts`
- [ ] T021 Implement `saveTodos()` to store only the Todo array under `spec-kit-todo-items` in `src/composables/useTodos.ts`
- [ ] T022 Wire `loadTodos()` into `useTodos()` initialization in `src/composables/useTodos.ts`
- [ ] T023 Run `npm.cmd run build` from repository root to confirm type and composable work passes

**Checkpoint**: Todo types and state logic exist, localStorage behavior is implemented, and build passes.

---

## Phase 3: Component Implementation

**Purpose**: Build the component structure and wire props/events through `App.vue`.

### User Story 1 - Add and View Todos (Priority: P1)

**Goal**: Users can add valid Todos and see them in the list.

**Independent Test**: Add a valid Todo, see it in the list, confirm blank input is rejected, and confirm input clears after successful add.

- [ ] T024 [US1] Create `TodoInput.vue` component shell with `<script setup lang="ts">` in `src/components/TodoInput.vue`
- [ ] T025 [US1] Implement local input state, Enter submit, Add button submit, trim, blank rejection, and successful clear behavior in `src/components/TodoInput.vue`
- [ ] T026 [US1] Create `TodoList.vue` component shell with typed `todos: Todo[]` prop in `src/components/TodoList.vue`
- [ ] T027 [US1] Implement list rendering and empty-state text in `src/components/TodoList.vue`
- [ ] T028 [US1] Update `App.vue` to call `useTodos()` and render `TodoInput.vue` and `TodoList.vue` in `src/App.vue`
- [ ] T029 [US1] Wire `TodoInput` add event to `addTodo` and pass `filteredTodos` to `TodoList` in `src/App.vue`

### User Story 2 - Manage Todo State and Text (Priority: P1)

**Goal**: Users can complete, reopen, edit, and delete Todos.

**Independent Test**: Create one Todo, toggle it complete and incomplete, edit it with valid text, reject blank edited text, and delete it.

- [ ] T030 [US2] Create `TodoItem.vue` component shell with typed `todo: Todo` prop in `src/components/TodoItem.vue`
- [ ] T031 [US2] Implement complete/incomplete toggle control and emit `toggle(id)` in `src/components/TodoItem.vue`
- [ ] T032 [US2] Implement delete control and emit `remove(id)` in `src/components/TodoItem.vue`
- [ ] T033 [US2] Implement edit mode state and text input in `src/components/TodoItem.vue`
- [ ] T034 [US2] Implement Enter-to-save edit behavior with trimmed non-empty text in `src/components/TodoItem.vue`
- [ ] T035 [US2] Implement Esc-to-cancel edit behavior preserving original text in `src/components/TodoItem.vue`
- [ ] T036 [US2] Implement blur-to-save edit behavior with blank edit preserving original text in `src/components/TodoItem.vue`
- [ ] T037 [US2] Update `TodoList.vue` to render `TodoItem.vue` and forward `toggle`, `remove`, and `edit` events in `src/components/TodoList.vue`
- [ ] T038 [US2] Wire `TodoList` events to `toggleTodo`, `deleteTodo`, and `editTodo` in `src/App.vue`

### User Story 3 - Filter and Clear Todos (Priority: P2)

**Goal**: Users can filter all, active, completed Todos and clear completed Todos.

**Independent Test**: Create mixed completed and incomplete Todos, switch each filter, and clear completed Todos while active Todos remain.

- [ ] T039 [US3] Create `TodoFilter.vue` component shell with typed `currentFilter: TodoFilter` and `completedCount: number` props in `src/components/TodoFilter.vue`
- [ ] T040 [US3] Implement all, active, and completed filter buttons that emit `update:filter(filter)` in `src/components/TodoFilter.vue`
- [ ] T041 [US3] Implement clear completed button that emits `clearCompleted()` in `src/components/TodoFilter.vue`
- [ ] T042 [US3] Add selected-filter state display in `src/components/TodoFilter.vue`
- [ ] T043 [US3] Wire `TodoFilter.vue` to `currentFilter`, `completedCount`, `setFilter`, and `clearCompleted` in `src/App.vue`

### User Story 4 - Keep Todos After Refresh (Priority: P2)

**Goal**: Todos persist after page refresh, while filter state resets to all.

**Independent Test**: Add, edit, complete, delete, and clear Todos, refresh the page, and confirm saved Todo data matches the last state.

- [ ] T044 [US4] Confirm all Todo mutations call persistence helpers in `src/composables/useTodos.ts`
- [ ] T045 [US4] Confirm `currentFilter` is not written to localStorage and defaults to `all` after reload in `src/composables/useTodos.ts`
- [ ] T046 [US4] Confirm invalid localStorage data falls back to an empty list without blocking the app in `src/composables/useTodos.ts`
- [ ] T047 Run `npm.cmd run build` from repository root to confirm all component props and emitted events type-check

**Checkpoint**: All core components are wired, props/events are typed, and build passes.

---

## Phase 4: Todo Functionality Acceptance

**Purpose**: Validate all Todo behaviors from the spec and quickstart before styling polish.

- [ ] T048 [US1] Manually verify valid Todo creation using `src/components/TodoInput.vue` and `src/App.vue`
- [ ] T049 [US1] Manually verify blank Todo input is rejected using `src/components/TodoInput.vue`
- [ ] T050 [US1] Manually verify input clears after successful Todo creation using `src/components/TodoInput.vue`
- [ ] T051 [US1] Manually verify the Todo list displays created Todos using `src/components/TodoList.vue`
- [ ] T052 [US2] Manually verify complete and incomplete toggling using `src/components/TodoItem.vue`
- [ ] T053 [US2] Manually verify Todo deletion removes the item using `src/components/TodoItem.vue`
- [ ] T054 [US2] Manually verify Todo editing saves valid trimmed text using `src/components/TodoItem.vue`
- [ ] T055 [US2] Manually verify Enter saves edit text using `src/components/TodoItem.vue`
- [ ] T056 [US2] Manually verify Esc cancels edit text using `src/components/TodoItem.vue`
- [ ] T057 [US2] Manually verify blur saves edit text using `src/components/TodoItem.vue`
- [ ] T058 [US2] Manually verify blank edited text is not saved using `src/components/TodoItem.vue`
- [ ] T059 [US3] Manually verify all, active, and completed filters using `src/components/TodoFilter.vue`
- [ ] T060 [US3] Manually verify clear completed removes completed Todos and preserves active Todos using `src/components/TodoFilter.vue`
- [ ] T061 [US4] Manually verify Todo data remains after page refresh using localStorage key `spec-kit-todo-items`
- [ ] T062 [US4] Manually verify filter state resets to `all` after page refresh using `src/composables/useTodos.ts`
- [ ] T063 Run `npm.cmd run build` from repository root after functionality validation

**Checkpoint**: All acceptance criteria are manually verified and build passes.

---

## Phase 5: Styling and Readability Polish

**Purpose**: Add simple UI styling, improve readability, and complete final validation.

- [ ] T064 Add a simple readable app layout in `src/style.css`
- [ ] T065 Add clear completed-state styling such as line-through text and reduced opacity in `src/style.css` or `src/components/TodoItem.vue`
- [ ] T066 Add selected-filter button styling in `src/style.css` or `src/components/TodoFilter.vue`
- [ ] T067 Add empty-list text styling in `src/style.css` or `src/components/TodoList.vue`
- [ ] T068 Add accessible labels or text for input, toggle, edit, delete, filter, and clear-completed controls in Todo components under `src/components/`
- [ ] T069 Review component and composable names for clarity in `src/App.vue`, `src/composables/useTodos.ts`, and `src/components/`
- [ ] T070 Remove repeated logic or unused code from `src/App.vue`, `src/composables/useTodos.ts`, and `src/components/`
- [ ] T071 Run full manual validation from `specs/001-todo-list-app/quickstart.md`
- [ ] T072 Run final `npm.cmd run build` from repository root

**Checkpoint**: UI is readable, completed/filter/empty states are clear, quickstart validation is complete, and final build passes.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** must complete before any Todo feature work.
- **Phase 2** depends on Phase 1 and blocks all components.
- **Phase 3** depends on Phase 2 and builds user-facing functionality.
- **Phase 4** depends on Phase 3 and validates behavior.
- **Phase 5** depends on Phase 4 and completes UI/readability polish.

### User Story Dependencies

- **US1 Add and View Todos**: Depends on Phase 2. Suggested MVP scope.
- **US2 Manage Todo State and Text**: Depends on US1 list rendering and Phase 2 mutation methods.
- **US3 Filter and Clear Todos**: Depends on Phase 2 filter state and enough Todo UI from US1/US2 to validate mixed states.
- **US4 Keep Todos After Refresh**: Depends on Phase 2 persistence and uses US1/US2/US3 flows for validation.

### Within Each Story

- Types before composable.
- Composable state before composable actions.
- Composable actions before components.
- Component shells before wiring events.
- Core behavior before styling.
- Build after each major phase.

## Parallel Opportunities

- After T006, folder/file creation for `src/types/todo.ts` and `src/composables/useTodos.ts` can be prepared independently, but composable implementation depends on types.
- After T023, `TodoInput.vue`, `TodoList.vue`, `TodoItem.vue`, and `TodoFilter.vue` shells can be created in parallel.
- Styling tasks T064-T067 can be worked on in parallel after behavior is stable because they touch separate styling concerns.
- Manual validation tasks within Phase 4 can be split by user story after Phase 3 build passes.

## Parallel Example: Component Shells

```text
Task: "T024 [US1] Create TodoInput.vue component shell in src/components/TodoInput.vue"
Task: "T026 [US1] Create TodoList.vue component shell in src/components/TodoList.vue"
Task: "T030 [US2] Create TodoItem.vue component shell in src/components/TodoItem.vue"
Task: "T039 [US3] Create TodoFilter.vue component shell in src/components/TodoFilter.vue"
```

## Implementation Strategy

### MVP First

1. Complete Phase 1.
2. Complete Phase 2.
3. Complete US1 tasks T024-T029.
4. Run build and manually validate add/view/blank rejection/input clearing.

### Incremental Delivery

1. Add US2 task group for toggle, edit, and delete.
2. Add US3 task group for filtering and clear completed.
3. Add US4 validation for localStorage refresh behavior.
4. Complete Phase 5 styling and readability polish.
5. Run final quickstart validation and `npm.cmd run build`.

## Notes

- Do not add backend APIs, databases, login, Pinia, Vue Router, Element Plus, Bootstrap, or other large UI frameworks.
- Keep implementation simple and readable for Vue 3 + TypeScript practice.
- Mark a task complete only after its described behavior can be verified.
- This task list intentionally does not require automated tests because the current spec does not request them.
