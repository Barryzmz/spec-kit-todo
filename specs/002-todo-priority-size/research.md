# Research: Todo Size and Urgency

## Decision: Extend the existing `Todo` entity instead of creating a separate priority model

**Rationale**: Work size and urgency are direct attributes of a Todo. Keeping them
on the existing entity keeps localStorage persistence simple and avoids unnecessary
relationships or additional state containers.

**Alternatives considered**:

- Separate metadata map keyed by Todo ID: rejected because it would complicate
  persistence and migration for no current benefit.
- Separate priority entity: rejected because there is no backend, database, or
  shared priority catalog.

## Decision: Represent work size as a string union

**Rationale**: The allowed values are fixed: big work and small work. A TypeScript
union such as `type TodoSize = 'big' | 'small'` is explicit, easy to validate, and
does not require an enum or external dependency.

**Alternatives considered**:

- Boolean `isBigWork`: rejected because UI text and validation are clearer with
  named values.
- Numeric size code: rejected because it is less readable for a learning project.

## Decision: Represent urgency as a number from `1` through `5`

**Rationale**: The clarified requirement defines a bounded scale where `1` is most
urgent and `5` is least urgent. A number type with runtime validation keeps the
model simple while preserving the ordering semantics.

**Alternatives considered**:

- Positive integer without upper bound: rejected because clarification changed the
  domain to a five-level scale.
- String urgency values: rejected because numeric comparison semantics are part of
  the user requirement.

## Decision: Reject empty or invalid urgency when adding a Todo

**Rationale**: The clarified requirement says empty urgency must prevent creation
and show or preserve validation feedback. This keeps newly created records complete
and avoids hidden defaults in the add flow.

**Alternatives considered**:

- Default empty add urgency to `1`: rejected by clarification.
- Add Todo and let users fix urgency later: rejected because it creates invalid
  records and weakens acceptance criteria.

## Decision: Preserve previous values on invalid edit

**Rationale**: The spec requires invalid urgency edits not to replace the previous
valid urgency. Applying the same conservative behavior to invalid size/title values
keeps edits non-destructive and consistent with the existing blank-title edit rule.

**Alternatives considered**:

- Clear invalid fields: rejected because it would create invalid persisted Todos.
- Delete the Todo on invalid edit: rejected because it is destructive and outside
  the feature scope.

## Decision: Normalize existing saved Todos on load

**Rationale**: Existing localStorage records from the first feature do not contain
`size` or `urgency`. Normalizing them to `small` and `5` on load preserves user data
while moving records to the new required shape.

**Alternatives considered**:

- Drop old records: rejected because it would lose user data.
- Ask the user to manually migrate each Todo: rejected as unnecessary UI complexity.
- Store a separate schema version: rejected because the project is small and this
  single migration can be handled by validation/normalization.

## Decision: Keep the existing localStorage key and filter behavior

**Rationale**: The feature extends Todo records but does not introduce a new storage
domain or new filters. Keeping `spec-kit-todo-items` preserves existing data and
minimizes implementation risk.

**Alternatives considered**:

- New localStorage key: rejected because it would hide existing Todos unless a more
  complex migration was added.
- Add urgency sorting or filters: rejected because the spec explicitly keeps sorting
  and new filters out of scope.

## Decision: Use UI interaction contracts, not API contracts

**Rationale**: The app has no backend API, database, login, or external service.
The meaningful contracts are component props, emitted events, validation behavior,
and persistence expectations.

**Alternatives considered**:

- OpenAPI or endpoint contracts: rejected because there are no endpoints.
- Database schema: rejected because persistence is localStorage only.
