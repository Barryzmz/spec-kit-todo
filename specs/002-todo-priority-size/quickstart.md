# Quickstart: Todo Size and Urgency

## Prerequisites

- Node dependencies installed with `npm install`.

## Run Locally

```powershell
npm.cmd run dev
```

Open the local Vite URL shown in the terminal.

## Manual Validation

1. Add `Plan release` with size `big` and urgency `1`; verify the list shows the
   Todo, `big`, and urgency `1`.
2. Add `Clean notes` with size `small` and urgency `5`; verify the list shows the
   Todo, `small`, and urgency `5`.
3. Try to add a Todo with a valid title and empty urgency; verify no Todo is added
   and validation feedback is shown or preserved.
4. Try urgency `0`; verify no Todo is added.
5. Try urgency `6`; verify no Todo is added.
6. Try urgency `2.5`; verify no Todo is added.
7. Try urgency `abc`; verify no Todo is added.
8. Add `  Review docs  ` with size `small` and urgency `3`; verify the saved title
   is `Review docs`.
9. Toggle a Todo complete; verify completed styling remains visible.
10. Delete a Todo; verify it disappears.
11. Edit a Todo from size `big` to `small`; verify the list updates.
12. Edit a Todo urgency from `4` to `1`; verify the list updates.
13. Edit a Todo urgency to `0`, `6`, or a non-integer; verify the previous valid
    urgency remains.
14. Edit a Todo title to spaces only; verify the previous title remains.
15. Press Enter during edit; verify valid title, size, and urgency changes save.
16. Press Esc during edit; verify changes are cancelled.
17. Blur during edit; verify valid changes save.
18. Refresh the page; verify title, completion state, size, and urgency remain.
19. With existing localStorage data that lacks `size` or `urgency`, reload the app;
    verify those Todos appear as `small` with urgency `5`.
20. Verify existing filters still show all, active, and completed Todos correctly.

## Build Gate

```powershell
npm.cmd run build
```

The build must pass before implementation is considered complete.
