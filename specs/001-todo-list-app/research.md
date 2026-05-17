# Research: Simple Todo List App

## Decision: Use a single `useTodos` composable for state management

**Rationale**: The feature is a single-page Todo app with one cohesive state domain.
A composable keeps state logic reusable and testable without introducing a global
store.

**Alternatives considered**:

- Pinia: rejected because the constitution and user constraints prohibit it unless
  complexity increases.
- Component-only state in `App.vue`: rejected because persistence and mutations
  would make `App.vue` harder to read.

## Decision: Persist only the Todo array in localStorage

**Rationale**: The requirements state Todo data must remain after refresh, while
filter state does not need persistence. Storing only Todos keeps the saved data
minimal and aligned with the spec.

**Alternatives considered**:

- Persist filter state: rejected because the user explicitly said not to save it.
- Session-only state: rejected because refresh persistence is required.

## Decision: Use `crypto.randomUUID()` with `Date.now().toString()` fallback

**Rationale**: `crypto.randomUUID()` provides simple unique IDs in modern browsers.
The timestamp fallback keeps the app usable in browsers without that method.

**Alternatives considered**:

- External ID library: rejected as unnecessary dependency for a learning Todo app.
- Array index as ID: rejected because deletion and filtering can make indexes unstable.

## Decision: Split UI into input, list, item, and filter components

**Rationale**: The requested component split gives each file a clear responsibility
while avoiding over-abstraction.

**Alternatives considered**:

- Single large `App.vue`: rejected because editing, filtering, and persistence would
  become harder to maintain.
- More granular components: rejected because the app is intentionally small.

## Decision: No external contracts beyond UI interaction contracts

**Rationale**: The project has no backend API, database, login, or external service.
A UI contract document is enough to capture component inputs, outputs, and behavior.

**Alternatives considered**:

- API contracts: rejected because APIs are out of scope.
- Database schema: rejected because persistence is localStorage only.
