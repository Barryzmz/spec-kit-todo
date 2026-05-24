# Feature Specification: Todo Size and Urgency

**Feature Branch**: `002-todo-priority-size`

**Created**: 2026-05-24

**Status**: Draft

**Input**: User description: "Add Todo classification and urgency to the existing spec-kit-todo app. Each Todo can choose work size as big work or small work, set urgency as a positive integer where smaller numbers are more urgent and 1 is most urgent, choose size and urgency when adding, edit size and urgency later, show both in the list, and keep them after refresh. Keep Vue 3 + TypeScript + Vite + Composition API, no backend API, database, login, Pinia, or large UI framework."

## Clarifications

### Session 2026-05-24

- Q: What should happen when a user leaves urgency empty while adding a Todo? A: The Todo must not be added, and the UI must show or preserve a validation error state.
- Q: How should existing saved Todos without size or urgency be handled, and what is the urgency scale? A: Existing Todos default to small work and urgency 5; urgency is limited to 1 through 5, where 5 is least urgent.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add Todo With Size and Urgency (Priority: P1)

A user can create a Todo with a work size and urgency value so the list records
both what needs doing and how to judge its relative importance.

**Why this priority**: Creating Todos with the new fields is the core behavior; the
feature has no value if new Todos cannot capture size and urgency.

**Independent Test**: Add a Todo with title, work size, and urgency; verify the Todo
appears with the selected size and urgency.

**Acceptance Scenarios**:

1. **Given** the user enters a valid Todo title, selects `big`, and enters urgency `1`, **When** the Todo is added, **Then** the list shows the Todo with `big` size and urgency `1`.
2. **Given** the user enters a valid Todo title, selects `small`, and enters urgency `3`, **When** the Todo is added, **Then** the list shows the Todo with `small` size and urgency `3`.
3. **Given** the user enters an urgency value below `1` or above `5`, **When** the Todo is submitted, **Then** the Todo is not added.
4. **Given** the user enters a non-integer urgency value, **When** the Todo is submitted, **Then** the Todo is not added.
5. **Given** the user leaves urgency empty, **When** the Todo is submitted, **Then** the Todo is not added and the UI shows or preserves a validation error state.

---

### User Story 2 - View Size and Urgency in Todo List (Priority: P1)

A user can see each Todo's work size and urgency in the list so they can compare
items without opening an edit flow.

**Why this priority**: The new fields must be visible for users to make decisions
from the Todo list.

**Independent Test**: Add several Todos with different sizes and urgency values;
verify each list item displays its own size and urgency.

**Acceptance Scenarios**:

1. **Given** a Todo has size `big`, **When** the list is displayed, **Then** that Todo shows the big-work label.
2. **Given** a Todo has size `small`, **When** the list is displayed, **Then** that Todo shows the small-work label.
3. **Given** a Todo has urgency `1`, **When** the list is displayed, **Then** that Todo shows urgency `1` as the most urgent value.
4. **Given** a Todo has urgency `5`, **When** the list is displayed, **Then** that Todo shows urgency `5` as the least urgent value.
5. **Given** multiple Todos have different urgency values, **When** the list is displayed, **Then** each Todo shows its own urgency value.

---

### User Story 3 - Edit Size and Urgency (Priority: P2)

A user can update a Todo's work size and urgency when their understanding of the
work changes.

**Why this priority**: Editing preserves the usefulness of existing Todos after the
new fields are added.

**Independent Test**: Create a Todo, edit its size and urgency, and verify the list
shows the updated values while preserving the Todo itself.

**Acceptance Scenarios**:

1. **Given** a Todo has size `big`, **When** the user changes it to `small` and saves, **Then** the Todo shows size `small`.
2. **Given** a Todo has urgency `4`, **When** the user changes it to urgency `1` and saves, **Then** the Todo shows urgency `1`.
3. **Given** a user enters an invalid urgency during edit, **When** the edit is saved, **Then** the previous valid urgency is preserved.
4. **Given** a user edits size or urgency, **When** the edit is saved, **Then** the Todo title, completion state, and creation order are preserved unless also intentionally edited.

---

### User Story 4 - Persist Size and Urgency After Refresh (Priority: P2)

A user can refresh the page and keep each Todo's size and urgency, so prioritization
data is not lost between sessions in the same browser.

**Why this priority**: Size and urgency must persist with the Todo record to be
useful across page reloads.

**Independent Test**: Add or edit Todos with size and urgency, refresh the page, and
verify those values are restored.

**Acceptance Scenarios**:

1. **Given** a Todo was added with size and urgency, **When** the page is refreshed, **Then** the same size and urgency are still visible.
2. **Given** a Todo's size and urgency were edited, **When** the page is refreshed, **Then** the edited size and urgency are still visible.
3. **Given** existing Todo records do not have size or urgency fields, **When** they are loaded after this feature is introduced, **Then** they default to small work and urgency `5`.

### Edge Cases

- Urgency must be an integer from `1` through `5`.
- Urgency `1` is the most urgent value.
- Urgency `5` is the least urgent value.
- Smaller urgency numbers represent higher urgency than larger numbers.
- Work size must be either big work or small work.
- Existing Todo title, completion state, and creation order are preserved when only size or urgency changes.
- The selected filter behavior from the existing Todo app remains unchanged.
- Todo size and urgency persist only in the current browser profile and device.
- Empty urgency is invalid when adding a Todo.
- Existing saved Todos without size or urgency default to small work and urgency `5`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to assign each Todo a work size of big work or small work.
- **FR-002**: Users MUST be able to assign each Todo an urgency value.
- **FR-003**: Urgency MUST be represented as an integer from `1` through `5`.
- **FR-004**: Urgency value `1` MUST represent the most urgent level.
- **FR-005**: Urgency value `5` MUST represent the least urgent level, and smaller urgency numbers MUST represent higher urgency than larger urgency numbers.
- **FR-006**: Users MUST be able to choose work size when adding a Todo.
- **FR-007**: Users MUST be able to provide urgency when adding a Todo.
- **FR-008**: Empty urgency MUST prevent adding a Todo and MUST show or preserve a validation error state.
- **FR-009**: Users MUST be able to edit a Todo's work size.
- **FR-010**: Users MUST be able to edit a Todo's urgency.
- **FR-011**: Invalid urgency values MUST NOT replace the previous valid urgency during editing.
- **FR-012**: The Todo list MUST display each Todo's work size.
- **FR-013**: The Todo list MUST display each Todo's urgency.
- **FR-014**: Todo size and urgency MUST persist after page refresh in the same browser.
- **FR-015**: The feature MUST NOT require login, backend APIs, databases, remote synchronization, Pinia, or a large UI framework.
- **FR-016**: Existing Todo behavior for add, view, completion, edit, delete, filter, clear completed, and local persistence MUST continue to work.
- **FR-017**: Existing saved Todos without size or urgency MUST default to small work and urgency `5` when loaded.

### Key Entities *(include if feature involves data)*

- **Todo**: Existing user-created item extended with work size and urgency.
- **Work Size**: The classification of a Todo as big work or small work.
- **Urgency**: An integer from `1` through `5`, where `1` is most urgent, `5` is least urgent, and smaller values are more urgent.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of newly added Todos can store and display one valid work size.
- **SC-002**: 100% of newly added Todos can store and display one valid urgency value.
- **SC-003**: 100% of urgency values below `1`, above `5`, or non-integer urgency values are rejected.
- **SC-004**: A user can edit a Todo's size and urgency without losing its title, completion state, or order.
- **SC-005**: After refresh, 100% of valid Todo size and urgency values remain visible in the same browser.
- **SC-006**: Existing Todo workflows still pass their prior acceptance checks after size and urgency are added.
- **SC-007**: The implementation continues to pass the project build gate.

## Assumptions

- Work size labels may be displayed as `Big`/`Small`, `大工作`/`小工作`, or equivalent localized labels.
- Urgency is manually entered or selected by the user; automatic sorting by urgency is not part of this feature unless specified later.
- This feature does not add new filters or sorting behavior.
- Existing saved Todos without size or urgency are migrated in memory to small work and urgency `5` when loaded.
