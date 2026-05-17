<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- PRINCIPLE_1_NAME -> I. Vue 3 TypeScript Vite Baseline
- PRINCIPLE_2_NAME -> II. Composition API by Default
- PRINCIPLE_3_NAME -> III. Browser-Only Todo Scope
- PRINCIPLE_4_NAME -> IV. Simple Maintainable UI
- PRINCIPLE_5_NAME -> V. Spec-Driven Acceptance and Build Verification
Added sections:
- Project Scope
- Development Workflow
Removed sections:
- None
Templates requiring updates:
- UPDATED .specify/templates/plan-template.md
- UPDATED .specify/templates/spec-template.md
- UPDATED .specify/templates/tasks-template.md
- NOT PRESENT .specify/templates/commands/*.md
- UPDATED README.md
- REVIEWED AGENTS.md; no change required
Follow-up TODOs:
- None
-->
# spec-kit-todo Constitution

## Core Principles

### I. Vue 3 TypeScript Vite Baseline
All application code MUST target Vue 3, TypeScript, and Vite. Features MUST fit the
existing Vite single-page application structure unless a later constitution amendment
explicitly changes the project architecture.

Rationale: The project exists to practice Spec Kit specification-driven development
and Vue 3 fundamentals, so the stack must remain stable and focused.

### II. Composition API by Default
Vue components MUST use the Composition API. Single-file components SHOULD prefer
`<script setup lang="ts">` when practical, with explicit TypeScript types for Todo
data and component props/events.

Rationale: Composition API is the learning target and keeps state, derived values,
and event handlers easy to follow in small Vue components.

### III. Browser-Only Todo Scope
Todo data MUST be stored in browser `localStorage` only. The project MUST NOT add a
backend service, database, API layer, authentication, or login flow. Pinia MUST NOT
be introduced unless a future requirement demonstrates that component-local state
and small composables are no longer sufficient.

Rationale: Avoiding backend and global-store complexity keeps the practice project
centered on frontend behavior and Spec Kit workflow.

### IV. Simple Maintainable UI
Components MUST be simple, readable, and easy to maintain. The project MUST NOT
introduce Element Plus, Bootstrap, or other large UI frameworks. Styling SHOULD use
lightweight project-local CSS and small focused components.

Rationale: The UI surface should support Vue learning and maintainability, not hide
basic implementation decisions behind broad framework abstractions.

### V. Spec-Driven Acceptance and Build Verification
Every feature MUST define clear acceptance criteria before implementation. Each
completed implementation MUST verify the relevant acceptance scenarios and MUST pass
`npm run build` before being considered complete.

Rationale: The project is a Spec Kit exercise; explicit acceptance and build gates
make the workflow concrete and repeatable.

## Project Scope

This project is a small Todo application for practicing Spec Kit and Vue 3 basics.
Accepted work includes Todo creation, editing, completion, filtering, deletion,
local persistence, responsive UI behavior, and other frontend-only enhancements
that can be validated in the browser.

Out of scope by default: login, user accounts, backend APIs, databases, server-side
deployment concerns, large UI frameworks, and global state libraries. Any proposal
that crosses these boundaries MUST update this constitution or document a justified
temporary exception in the implementation plan.

## Development Workflow

Specifications MUST describe user-visible behavior, edge cases, localStorage data
expectations, and independent acceptance scenarios. Plans MUST confirm the Vue 3,
TypeScript, Vite, Composition API, localStorage-only, no-backend, no-large-UI-framework,
and build-verification gates before implementation.

Tasks MUST be organized so each user story can be implemented and checked
independently. Implementation tasks SHOULD favor small Vue components, typed
composables, and project-local CSS. Completion requires validating the relevant
acceptance scenarios and running `npm run build`.

## Governance

This constitution supersedes conflicting project practices and generated templates.
Spec, plan, and task artifacts MUST be checked against the Core Principles before
implementation begins.

Amendments require a documented change to this file, a Sync Impact Report, and
updates to affected templates or runtime guidance. Versioning follows semantic
versioning: MAJOR for removing or redefining core principles in an incompatible way,
MINOR for adding principles or materially expanding governance, and PATCH for
clarifications that do not change obligations.

Compliance review happens during planning and again before implementation is marked
complete. Any violation MUST be listed in the plan's Complexity Tracking section
with a concrete reason and the simpler alternative that was rejected.

**Version**: 1.0.0 | **Ratified**: 2026-05-17 | **Last Amended**: 2026-05-17
