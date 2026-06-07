# Agent Instructions

## Preview Workflow

Environment:
- Windows 11, PowerShell. Do not use bash syntax.
- Working directory: `C:\Users\Afpt\Content\afpisso`, or the current repo root if moved.
- Project stack: React + Vite + Tailwind CSS v4 + Framer Motion.
- Dev preview command: `npm run dev`.
- Default Vite URL: `http://localhost:5173`.

To start the preview:
1. Run `npm run dev` from the project root.
2. Wait for `Local: http://localhost:5173` in the terminal output.
3. Open `http://localhost:5173` in the in-app browser.

Important:
- Do not run `npm run build` just to preview changes.
- Use `npm run dev` for preview iteration.
- Use PowerShell syntax only, for example `$env:VAR` for environment variables and backtick for line continuation.
- If Vite HMR on `CasePage.jsx` fails silently, do a full browser reload.
- `npm run build:ssg` takes 30-60 seconds. Use it only to validate production/SSG, not for normal preview.
