# WorkNest

A polished personal prototype of an all-in-one corporate employee workspace. Built for demonstrating UI/UX and everyday employee workflows in VS Code.

## Important scope

This version uses **TypeScript/Hono, HTML, CSS, and JavaScript — not Python/Django**. It is an interactive frontend prototype with a lightweight Hono web server and health API, not a production full-stack HR system.

All employees, activity, emails, policies, and dates are fictional. The demo is anchored to **November 9, 2026** for repeatable presentations. Changes are kept only in the current page's browser memory and reset on refresh. Nothing is sent to real employees or managers. No database, login, API token, Cloudflare account, or payment is needed to run the local demo.

## Run in VS Code

### Prerequisites

- Visual Studio Code.
- **Node.js 22.12 or newer** (Node 22 LTS recommended) and npm. Check with `node --version` and `npm --version`.
- A modern browser. Internet is needed to install dependencies. Google Fonts are optional; the UI falls back to system fonts if unavailable.

### Start the project (Windows, macOS, or Linux)

1. Extract the source ZIP.
2. In VS Code, choose **File > Open Folder**, and select the extracted `worknest` folder containing `package.json`.
3. Open **Terminal > New Terminal**.
4. Run:

```sh
npm install
npm run dev
```

5. Open **http://localhost:3000** in your browser. If port 3000 is already occupied, use the URL printed by Vite.
6. Leave the terminal running while presenting. Stop it with **Ctrl+C**.

The app is not a standalone HTML file: opening a source file with the Live Server extension will not run the Hono backend. Use the commands above instead.

On Windows, if PowerShell reports that `npm.ps1` cannot run, switch the VS Code terminal to **Command Prompt**, or use `npm.cmd install` and `npm.cmd run dev`. Do not disable system security policies just for this project.

### Test the production build locally

```sh
npm run build
npm run preview
```

Open http://localhost:3000. Stop the development server first so only one server uses that port. Local development and preview do not require Cloudflare login.

## Completed features

- Responsive dashboard with a forest-green/lime design system, custom CSS illustration, task summary, project previews, daily agenda, announcements, and quick actions.
- Projects: browse, filter, create a demo project, and inspect its tasks.
- My tasks: create tasks, choose a project/priority/date, and move between To do, In progress, and Done using action buttons. Dashboard checkboxes also update task state.
- People: search fictional teammates, filter by department, and view profiles.
- Calendar: browse months, select dates, create events, and inspect event details.
- Leave: sample balances, request form, date-range validation, weekday duration calculation, request details, and cancellation of pending requests.
- Help desk: create demo support tickets, inspect details, and mark tickets as resolved.
- Documents: search shared sample resources, preview content, and download readable demo `.txt` copies. These are not original PDF/DOC files.
- Settings: update the current demo profile and dashboard greeting for this session.
- Global search across pages, projects, teammates, and documents. Open with Ctrl+K (Windows/Linux) or Cmd+K (macOS).
- Notification dialog with mark-all-read, announcements, quick guide, toast feedback, and mobile navigation.
- Keyboard-accessible dialogs with Escape dismissal and a focus trap; reduced-motion styling.

## Recommended five-minute presentation

1. **Overview:** explain the goal — centralize employees' everyday tools into one calm workspace.
2. **Quick actions > Create a task:** add a task, show the Kanban board, start it, then mark it complete.
3. **People:** filter by Design, search Sophia, and open the profile.
4. **Leave & attendance:** request a three-day weekday break, show the pending status, then cancel it.
5. **Help desk:** raise a ticket, open it, and mark it resolved.
6. **Calendar:** create a meeting on a selected date and show its details.
7. **Documents:** open the employee handbook and download the sample text.
8. **Settings:** update your demo name; return to Overview to show the changed greeting.
9. Resize the browser to demonstrate the mobile menu and responsive cards.
10. Refresh to restore the original sample data before the next presentation.

## Code explanation map

| File | Purpose |
| --- | --- |
| `src/index.tsx` | Hono server, HTML document shell, sidebar/header, static routes, and health endpoint |
| `public/static/app.js` | SVG icons, fictional demo data, reusable UI components, page templates, client-side routing, validation, dialogs, and delegated event listeners |
| `public/static/style.css` | Design tokens, typography, layouts, component styles, animations, and responsive breakpoints |
| `vite.config.ts` | Vite development integration and Cloudflare Pages build adapter |
| `wrangler.jsonc` | Cloudflare compatibility and output configuration; no service bindings |
| `package.json` | npm scripts and dependencies |
| `ecosystem.config.cjs` | Sandbox-only PM2 configuration; not needed for your local VS Code demo |

### How the application works

1. A browser requests `/` from the Hono server.
2. Hono returns the HTML shell and links the CSS and client JavaScript.
3. JavaScript reads the URL hash and renders the selected workspace view.
4. Button `data-*` attributes are handled by delegated event listeners.
5. Forms use native browser validation plus JavaScript checks, update demo arrays, and rerender the UI.
6. User-entered strings are HTML-escaped before insertion into templates.
7. No form submits to an employee service or database. A future real backend would replace these array updates with authenticated API requests.

## Entry URIs

The app is served at `/`, with these client-side hash routes:

| URI | View |
| --- | --- |
| `/#dashboard` | Overview and quick actions |
| `/#projects` | Projects and project details |
| `/#tasks` | Kanban task board |
| `/#people` | Searchable employee directory |
| `/#calendar` | Calendar and event creation |
| `/#leave` | Leave balances and requests |
| `/#helpdesk` | Support tickets |
| `/#documents` | Shared resources |
| `/#settings` | Demo profile settings |
| `/api/health` | GET health response: `{ "status": "ok", "app": "WorkNest", "mode": "prototype" }` |
| `/static/app.js` | Client-side application |
| `/static/style.css` | Stylesheet |

No query parameters are required. Hash fragments are client-side UI navigation, not server access controls.

## Data architecture

- **Models:** Person, Project, Task, LeaveRequest, SupportTicket, Document, CalendarEvent, Profile.
- **Storage:** none. Fixed fixture arrays and temporary browser-memory changes only. No persistent storage service has been provisioned.
- Project progress and team-wide counts include illustrative sample totals and are not a computed accounting system. Leave balances do not deduct pending requests.
- No real personal information or credentials should be added to this prototype.

## Not implemented

- Python/Django backend.
- Authentication, registration, employee/manager/admin roles, or record authorization.
- Persistent CRUD APIs or database storage.
- Real manager approval, leave entitlements, holiday calendars, or attendance clock-in.
- Real IT dispatch, chat, email, notifications, or video meeting integrations.
- Document uploads or original PDF/DOC generation.
- Multiple workspaces or invitations.
- Drag-and-drop task movement (use the explicit action buttons).

## Recommended next steps

1. Keep this version as a UI/UX presentation prototype.
2. For a Cloudflare-based production implementation, add D1 relational storage and authenticated Hono APIs, then enforce record-level authorization.
3. If Python is required later, move data and validation into Django/Django REST Framework with PostgreSQL on a Python-compatible host; reuse the visual design and frontend assets. Django cannot run on Cloudflare Pages.
4. Add automated regression tests, audit contrast/accessibility, validate business rules, and configure secure production authentication before using any real company data.

## Testing performed

- JavaScript syntax check and Vite production build.
- Browser checks for all eight main modules and settings.
- Task creation/completion, project creation, employee filters/search, leave validation/cancellation, ticket creation/resolution, document preview/download, calendar events, global search, profile updates, announcements, and notification read state.
- Desktop (1440px) and mobile (390px) layout checks, with no page-level horizontal overflow.
- No browser runtime errors during the tested flows.

## Deployment status

- **Local/sandbox preview:** running on port 3000.
- **Temporary preview URL:** https://3000-i6rv1274ted3ahf7tjmqs-3c7ff1b5.sandbox.novita.ai
- **Production deployment:** not performed; no permanent domain configured.
- **Target compatibility:** Hono + Cloudflare Pages/Workers. Deployment is optional and separate from running locally.
- **Database/secrets:** none.
- **Last updated:** November 9, 2026.

The temporary preview can stop when the sandbox sleeps; the downloaded source can be run locally whenever needed.
#   W o r k S p a c e - P r o t o t y p e  
 