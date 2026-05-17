# Quickstart: Simple Todo List App

## Prerequisites

- Node dependencies installed with `npm install`.

## Run Locally

```powershell
npm.cmd run dev
```

Open the local Vite URL shown in the terminal.

## Manual Validation

1. Add `Buy milk`; verify it appears.
2. Try to add spaces only; verify no Todo is added.
3. Add `  Walk dog `; verify the saved text is `Walk dog`.
4. Verify the input clears after a successful add.
5. Toggle a Todo complete; verify completed styling is visible.
6. Toggle it again; verify it becomes active.
7. Edit a Todo and press Enter; verify the trimmed text is saved.
8. Edit a Todo and press Esc; verify the original text remains.
9. Edit a Todo and blur the field; verify the trimmed text is saved.
10. Edit a Todo to spaces only; verify the original text remains.
11. Delete a Todo; verify it disappears.
12. Switch filters between all, active, and completed.
13. Clear completed Todos; verify active Todos remain.
14. Refresh the page; verify Todo titles and completion states remain.
15. Verify the filter resets to all after refresh.

## Build Gate

```powershell
npm.cmd run build
```

The build must pass before implementation is considered complete.
