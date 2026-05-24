# Tasks: Todo Size and Urgency

**Input**: Design documents from `/specs/002-todo-priority-size/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md, quickstart.md

**Tests**: Automated tests were not requested. Validate manually with quickstart.md and run `npm.cmd run build`.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches a different file and does not depend on incomplete tasks
- **[Story]**: User story label from spec.md
- Every task includes an exact file path

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing Vue 3 + TypeScript + Vite app is ready for this feature.

- [ ] T001 Confirm current branch is `002-todo-priority-size` and inspect working tree before editing files under `src/`
- [ ] T002 [P] Confirm existing implementation files match the plan structure in `src/types/todo.ts`, `src/composables/useTodos.ts`, `src/components/TodoList.vue`, `src/components/TodoItem.vue`, and `src/App.vue`
- [ ] T003 [P] Confirm no backend, API, database, login, Pinia, Vue Router, Element Plus, Bootstrap, or large UI framework dependency is required in `package.json`
- [ ] T004 Run `npm.cmd run build` using scripts from `package.json` and record whether the current baseline builds before feature changes

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add shared Todo size and urgency types, validation helpers, and persistence normalization before user-story UI work.

**CRITICAL**: No user story work should begin until this phase is complete.

- [ ] T005 Update `Todo` in `src/types/todo.ts` to include required `size` and `urgency` fields
- [ ] T006 Add `TodoSize` type with allowed values `big` and `small` in `src/types/todo.ts`
- [ ] T007 Add `TodoUrgency` type with allowed values `1 | 2 | 3 | 4 | 5` in `src/types/todo.ts`
- [ ] T008 Add `TodoEditPayload` type for editing title, size, and urgency in `src/types/todo.ts`
- [ ] T009 Add `isTodoSize` and `isTodoUrgency` validation helpers in `src/composables/useTodos.ts`
- [ ] T010 Update localStorage load validation in `src/composables/useTodos.ts` to accept existing valid base Todos missing `size` or `urgency`
- [ ] T011 Normalize missing or invalid saved Todo `size` to `small` in `src/composables/useTodos.ts`
- [ ] T012 Normalize missing or invalid saved Todo `urgency` to `5` in `src/composables/useTodos.ts`
- [ ] T013 Confirm `currentFilter` remains in-memory only and is not saved to localStorage in `src/composables/useTodos.ts`
- [ ] T014 Run `npm.cmd run build` using scripts from `package.json` after foundational type and persistence changes

**Checkpoint**: Extended Todo data can be represented and loaded safely.

---

## Phase 3: User Story 1 - Add Todo With Size and Urgency (Priority: P1)

**Goal**: A user can add a Todo with title, work size, and urgency.

**Independent Test**: Add one Todo with `big` and urgency `1`, and one Todo with `small` and urgency `3`; both appear in local state with the selected values. Empty, below-range, above-range, and non-integer urgency values do not add a Todo.

### Implementation for User Story 1

- [ ] T015 [US1] Change `addTodo` signature to accept title, size, and urgency in `src/composables/useTodos.ts`
- [ ] T016 [US1] Validate trimmed non-empty title before adding in `src/composables/useTodos.ts`
- [ ] T017 [US1] Validate `size` is `big` or `small` before adding in `src/composables/useTodos.ts`
- [ ] T018 [US1] Validate urgency is an integer from `1` through `5` before adding in `src/composables/useTodos.ts`
- [ ] T019 [US1] Save new Todos with `size` and `urgency` fields in `src/composables/useTodos.ts`
- [ ] T020 [US1] Add add-form state for selected size in `src/App.vue`
- [ ] T021 [US1] Add add-form state for urgency input and validation error display in `src/App.vue`
- [ ] T022 [US1] Add size selection controls for `big` and `small` in the add form in `src/App.vue`
- [ ] T023 [US1] Add urgency input constrained to values `1` through `5` in the add form in `src/App.vue`
- [ ] T024 [US1] Update `handleAddTodo` to call `addTodo(title, size, urgency)` and clear inputs only after success in `src/App.vue`
- [ ] T025 [US1] Add local CSS for add-form size and urgency controls in `src/style.css`
- [ ] T026 [US1] Manually validate quickstart steps 1 through 8 using `specs/002-todo-priority-size/quickstart.md`
- [ ] T027 [US1] Run `npm.cmd run build` using scripts from `package.json` after User Story 1 implementation

**Checkpoint**: Users can add complete Todo records with valid size and urgency.

---

## Phase 4: User Story 2 - View Size and Urgency in Todo List (Priority: P1)

**Goal**: A user can see each Todo's work size and urgency in the list.

**Independent Test**: Create multiple Todos with different size and urgency values; each list row displays its own size and urgency while existing completion/delete behavior still works.

### Implementation for User Story 2

- [ ] T028 [P] [US2] Update `TodoList.vue` props usage to pass extended Todo records to `TodoItem.vue` in `src/components/TodoList.vue`
- [ ] T029 [P] [US2] Render work size label for each Todo in `src/components/TodoItem.vue`
- [ ] T030 [US2] Render urgency label for each Todo in `src/components/TodoItem.vue`
- [ ] T031 [US2] Preserve checkbox toggle emit behavior after adding metadata display in `src/components/TodoItem.vue`
- [ ] T032 [US2] Preserve delete emit behavior after adding metadata display in `src/components/TodoItem.vue`
- [ ] T033 [US2] Add list item CSS for size and urgency metadata in `src/style.css`
- [ ] T034 [US2] Confirm completed Todo styling remains visibly distinct with metadata in `src/style.css`
- [ ] T035 [US2] Manually validate quickstart steps 9, 10, and 20 using `specs/002-todo-priority-size/quickstart.md`
- [ ] T036 [US2] Run `npm.cmd run build` using scripts from `package.json` after User Story 2 implementation

**Checkpoint**: Todos display size and urgency without regressing existing list actions.

---

## Phase 5: User Story 3 - Edit Size and Urgency (Priority: P2)

**Goal**: A user can edit a Todo's title, work size, and urgency while preserving invalid-edit safety.

**Independent Test**: Edit a Todo from `big` to `small`, edit urgency from `4` to `1`, verify valid edits save, and verify invalid urgency keeps the previous valid urgency.

### Implementation for User Story 3

- [ ] T037 [P] [US3] Add `editTodo(payload: TodoEditPayload): boolean` in `src/composables/useTodos.ts`
- [ ] T038 [US3] Preserve previous title when edited title trims to empty in `src/composables/useTodos.ts`
- [ ] T039 [US3] Preserve previous size when edited size is invalid in `src/composables/useTodos.ts`
- [ ] T040 [US3] Preserve previous urgency when edited urgency is empty, below `1`, above `5`, or non-integer in `src/composables/useTodos.ts`
- [ ] T041 [P] [US3] Emit `edit` events from `TodoList.vue` to `App.vue` in `src/components/TodoList.vue`
- [ ] T042 [US3] Wire `editTodo` from `useTodos` into `TodoList` in `src/App.vue`
- [ ] T043 [P] [US3] Add edit-mode local state for title, size, and urgency in `src/components/TodoItem.vue`
- [ ] T044 [US3] Add edit controls for title, size, and urgency in `src/components/TodoItem.vue`
- [ ] T045 [US3] Save valid edit changes on Enter in `src/components/TodoItem.vue`
- [ ] T046 [US3] Cancel edit changes on Esc in `src/components/TodoItem.vue`
- [ ] T047 [US3] Save valid edit changes on blur in `src/components/TodoItem.vue`
- [ ] T048 [US3] Add CSS for edit-mode controls and validation feedback in `src/style.css`
- [ ] T049 [US3] Manually validate quickstart steps 11 through 17 using `specs/002-todo-priority-size/quickstart.md`
- [ ] T050 [US3] Run `npm.cmd run build` using scripts from `package.json` after User Story 3 implementation

**Checkpoint**: Users can edit size and urgency without corrupting existing Todos.

---

## Phase 6: User Story 4 - Persist Size and Urgency After Refresh (Priority: P2)

**Goal**: A user can refresh the page and keep Todo title, completion state, size, and urgency. Existing saved Todos without new fields load with defaults.

**Independent Test**: Add or edit Todos with size and urgency, refresh the page, and verify values remain. Seed old-format localStorage Todos without size/urgency and verify they load as `small` and `5`.

### Implementation for User Story 4

- [ ] T051 [US4] Confirm `saveTodos` writes the extended Todo array including `size` and `urgency` in `src/composables/useTodos.ts`
- [ ] T052 [US4] Confirm add, edit, toggle, and delete all call `saveTodos` after state changes in `src/composables/useTodos.ts`
- [ ] T053 [US4] Confirm old-format valid Todos without `size` or `urgency` render instead of being dropped in `src/composables/useTodos.ts`
- [ ] T054 [US4] Manually validate refresh persistence with newly added Todos using `specs/002-todo-priority-size/quickstart.md`
- [ ] T055 [US4] Manually validate old localStorage migration to `small` and urgency `5` using `specs/002-todo-priority-size/quickstart.md`
- [ ] T056 [US4] Run `npm.cmd run build` using scripts from `package.json` after User Story 4 implementation

**Checkpoint**: Persistence and migration behavior match the clarified spec.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup, consistency checks, and acceptance verification.

- [ ] T057 [P] Review `src/types/todo.ts` for simple names and no over-abstraction
- [ ] T058 [P] Review `src/composables/useTodos.ts` for readable validation and persistence flow
- [ ] T059 [P] Review `src/App.vue`, `src/components/TodoList.vue`, and `src/components/TodoItem.vue` for clear props and emits types
- [ ] T060 [P] Review `src/style.css` to confirm styling remains project-local and no large UI framework was introduced
- [ ] T061 Run all manual validation steps in `specs/002-todo-priority-size/quickstart.md`
- [ ] T062 Run `npm.cmd run build` using scripts from `package.json` as the final build gate
- [ ] T063 Confirm `package.json` does not add Pinia, Vue Router, backend, API, database, login, Element Plus, Bootstrap, or large UI framework dependencies
- [ ] T064 Update task checkboxes in `specs/002-todo-priority-size/tasks.md` for completed implementation and validation work
- [ ] T065 Confirm clear completed behavior still works after size and urgency changes using `src/App.vue`, `src/composables/useTodos.ts`, and `specs/002-todo-priority-size/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: No dependencies; start immediately.
- **Phase 2 Foundational**: Depends on Phase 1; blocks all user stories.
- **Phase 3 User Story 1**: Depends on Phase 2.
- **Phase 4 User Story 2**: Depends on Phase 2 and is most useful after User Story 1 creates records.
- **Phase 5 User Story 3**: Depends on Phase 2 and builds on the displayed Todo item UI from User Story 2.
- **Phase 6 User Story 4**: Depends on Phase 2 and validates persistence after add/edit behavior exists.
- **Phase 7 Polish**: Depends on selected user stories being complete.

### User Story Dependencies

- **US1 Add Todo With Size and Urgency (P1)**: MVP story; can be completed after foundational work.
- **US2 View Size and Urgency in Todo List (P1)**: Can be implemented after foundational work; manual validation is clearer after US1.
- **US3 Edit Size and Urgency (P2)**: Requires extended model and item UI; should follow US1 and US2.
- **US4 Persist Size and Urgency After Refresh (P2)**: Requires extended load/save logic; final validation should follow add/edit work.

### Within Each Story

- Types before composable signatures.
- Composable validation before component wiring.
- Component behavior before CSS polish.
- Manual validation before build checkpoint.

### Parallel Opportunities

- T002 and T003 can be checked in parallel during setup.
- T005 through T008 are in `src/types/todo.ts` and should be done together, while T009 can be prepared separately in `src/composables/useTodos.ts`.
- T028 through T030 can be developed in `TodoList.vue` and `TodoItem.vue` once extended Todos exist.
- T057 through T060 can be reviewed in parallel during polish because they inspect different files.

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate adding valid and invalid Todos.
4. Run `npm.cmd run build`.

### Incremental Delivery

1. Add foundational types and normalization.
2. Deliver US1 add behavior.
3. Deliver US2 list display behavior.
4. Deliver US3 edit behavior.
5. Deliver US4 persistence and old-data migration validation.
6. Run final quickstart validation and build gate.

### Scope Guardrails

- Do not add backend APIs, databases, login, Pinia, Vue Router, or large UI frameworks.
- Do not add sorting or new filters for urgency in this feature.
- Keep state in `useTodos` and simple component-local form state.
- Keep localStorage key as `spec-kit-todo-items`.
