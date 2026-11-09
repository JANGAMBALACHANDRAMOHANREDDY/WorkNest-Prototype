# WorkNest – Employee Workspace Platform

<p align="center">
  <strong>A Modern, All-in-One Employee Workspace Prototype</strong>
</p>

<p align="center">
  A centralized digital workspace designed to simplify everyday employee workflows through a clean, responsive, and intuitive interface.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white" alt="Hono" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Status-Prototype-orange?style=for-the-badge" alt="Prototype" />
</p>

---

## About the Project

**WorkNest** is a modern employee workspace prototype that brings essential workplace tools and everyday employee activities together in one centralized platform.

The project focuses on improving employee productivity, simplifying team collaboration, and providing a seamless user experience through a professional dashboard and intuitive navigation.

It demonstrates how different workplace operations can be organized into a single, accessible digital environment.
<img width="1896" height="910" alt="image" src="https://github.com/user-attachments/assets/d435f69c-6a9e-47c9-b9f5-d7103f7bc2f6" />


## Key Features

### 1. Interactive Dashboard
- Centralized employee workspace overview.
- Task summaries and project progress.
- Daily agenda and announcements.
- Quick actions for everyday activities.

### 2. Project Management
- Browse and filter projects.
- Create demonstration projects.
- Explore project tasks and details.

### 3. Task Management
- Interactive Kanban-style task board.
- Create and organize tasks.
- Set priorities and due dates.
- Track To Do, In Progress, and Done tasks.

### 4. Employee Directory
- Search employees and teammates.
- Filter employees by department.
- View individual employee profiles.

### 5. Calendar Management
- Interactive monthly calendar.
- Create and view calendar events.
- Select dates and inspect event details.

### 6. Leave Management
- View sample leave balances.
- Submit leave requests.
- Validate date ranges and calculate weekdays.
- Track and cancel pending requests.

### 7. Help Desk
- Create support tickets.
- View ticket details.
- Update ticket resolution status.

### 8. Document Management
- Browse shared sample documents.
- Search available resources.
- Preview and download demonstration text documents.

### 9. Settings and Personalization
- Update the demonstration user profile.
- Customize dashboard greetings.
- Manage session-based settings.

### 10. Additional Capabilities
- Global search with `Ctrl + K` / `Cmd + K`.
- Notification interface and announcements.
- Responsive mobile navigation.
- Accessible dialogs and keyboard interactions.
- Reduced-motion support.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| TypeScript | Application and server-side development |
| Hono | Lightweight web server and API |
| Vite | Development server and build tooling |
| HTML5 | Application structure |
| CSS3 | Styling, layouts, and responsive design |
| JavaScript | Interactive frontend functionality |
| Node.js | JavaScript runtime |
| Cloudflare Pages/Workers | Target deployment compatibility |

---

## Project Structure

```text
WorkSpace-Prototype/
│
├── public/
│   └── static/
│       ├── app.js
│       └── style.css
│
├── src/
│   └── index.tsx
│
├── .gitignore
├── ecosystem.config.cjs
├── package.json
├── package-lock.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── vite.config.ts
├── wrangler.jsonc
└── README.md
```

### Important Files

- `src/index.tsx` – Hono server, application shell, routes, and health endpoint.
- `public/static/app.js` – Frontend logic, UI components, sample data, and interactions.
- `public/static/style.css` – Design system, styling, animations, and responsive layouts.
- `vite.config.ts` – Vite development and build configuration.
- `wrangler.jsonc` – Cloudflare compatibility and deployment configuration.
- `package.json` – Project dependencies and npm scripts.

---

## Getting Started

Follow these instructions to run WorkNest locally on your computer.

### Prerequisites

Make sure you have installed:

- [Node.js 22.12 or newer](https://nodejs.org/)
- npm
- [Visual Studio Code](https://code.visualstudio.com/)
- A modern web browser

### Installation

**Step 1: Clone the repository**

```bash
git clone https://github.com/JANGAMBALACHANDRAMOHANREDDY/WorkSpace-Prototype.git
```

**Step 2: Navigate to the project directory**

```bash
cd WorkSpace-Prototype
```

**Step 3: Install dependencies**

```bash
npm install
```

**Step 4: Start the development server**

```bash
npm run dev
```

**Step 5: Open the application**

Visit:

```text
http://localhost:3000
```

The WorkNest application should now be running locally.

Keep the terminal open while using the application. Press `Ctrl + C` to stop the development server.

### Production Build

To generate and test a production build locally:

```bash
npm run build
```

Then run:

```bash
npm run preview
```

Open the local URL printed by Vite.

---

## Application Navigation

| Route | Description |
|---|---|
| `/#dashboard` | Main employee dashboard |
| `/#projects` | Project management |
| `/#tasks` | Task management board |
| `/#people` | Employee directory |
| `/#calendar` | Calendar and events |
| `/#leave` | Leave management |
| `/#helpdesk` | Employee support tickets |
| `/#documents` | Shared documents |
| `/#settings` | Profile and settings |
| `/api/health` | Application health endpoint |

---

## Application Architecture

WorkNest follows a lightweight client-server architecture.

1. The browser sends a request to the Hono server.
2. Hono serves the application HTML shell.
3. Vite serves the frontend assets during development.
4. JavaScript handles navigation, rendering, and user interactions.
5. Forms validate user input and update temporary demonstration data.
6. The application displays updated information without requiring a database.

### Data Storage

This version uses fictional sample data and temporary browser-memory state.

- No database is configured.
- Changes reset when the page is refreshed.
- No real employee information is stored.
- No authentication or authorization system is implemented.

**Important:** WorkNest is currently an interactive UI/UX prototype, not a production-ready enterprise HR management system.

---

## Future Enhancements

The following improvements could help evolve WorkNest into a full-stack enterprise employee management platform:

- [ ] User authentication and secure registration.
- [ ] Role-based access control for employees, managers, and administrators.
- [ ] Backend API integration.
- [ ] Persistent database using PostgreSQL.
- [ ] Real-time task and project updates.
- [ ] Employee attendance management.
- [ ] Advanced leave approval workflows.
- [ ] Email and notification integrations.
- [ ] Document upload and management.
- [ ] Automated testing and CI/CD deployment.
- [ ] Production deployment with a permanent domain.

---

## Testing

The prototype has undergone local development and build checks, including:

- JavaScript syntax validation.
- Vite production build verification.
- Dashboard and module navigation checks.
- Task and project interaction checks.
- Leave request validation.
- Support ticket workflows.
- Calendar and global search interactions.
- Desktop and mobile responsive layout checks.

---

## Project Scope

This repository is intended for:

- UI/UX prototyping.
- Frontend development demonstrations.
- Employee workspace design concepts.
- Learning modern web application development.
- Portfolio and project presentation.

All employee names, projects, activities, and other demonstration records are fictional.

---

## Author

**Jangam Balachandra Mohan Reddy**

Data Analytics & AI Enthusiast | Software Developer | Technology Explorer

Passionate about building innovative, data-driven applications and intelligent systems that solve real-world problems.

### Connect With Me

<p align="center">
  <a href="mailto:jangambalachandramohanreddy@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="https://github.com/JANGAMBALACHANDRAMOHANREDDY">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/jangam-balachandramohanreddy/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://jangam-bala-chandramohan-reddy.lovable.app">
    <img src="https://img.shields.io/badge/Portfolio-6C63FF?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" />
  </a>
</p>

- **Email:** jangambalachandramohanreddy@gmail.com
- **GitHub:** https://github.com/JANGAMBALACHANDRAMOHANREDDY
- **LinkedIn:** https://www.linkedin.com/in/jangam-balachandramohanreddy/
- **Portfolio:** https://jangam-bala-chandramohan-reddy.lovable.app

---

<p align="center">
  <strong>Let's Connect and Build Something Innovative!</strong>
</p>

## License

This project does not currently specify an open-source license. All rights are reserved by the project author unless a license is added.

---

<p align="center">
  <strong>WorkNest – Bringing Everyday Workflows Together.</strong>
</p>

<p align="center">
  Built with passion for better digital workplace experiences.
</p>
