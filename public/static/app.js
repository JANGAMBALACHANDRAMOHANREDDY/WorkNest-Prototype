"use strict";
// WorkNest is a session-only prototype. Refreshing restores the sample data.
// Presentation map: sample data -> view functions -> render() -> delegated events.
// No database writes or real employee information are involved.

// 1. Shared SVG icons and HTML escaping.
const paths = {
  home: "M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  folder:
    "M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
  check:
    "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  calendar:
    "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
  leaf: "M20 4c-9-2-17 1-15 10 1 5 7 6 10 3 4-4 4-9 5-13z M4 21l11-11",
  ticket:
    "M3 5h18v5a3 3 0 0 0 0 6v3H3v-3a3 3 0 0 0 0-6z M15 5v2 M15 11v2 M15 17v2",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h5",
  settings:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M9 3l-1 3-3 1-2 3 2 2v3l2 3h3l2 3 3-2 3-1 1-3 2-2-2-3V7l-3-1-2-3-3 1z",
  search: "M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4",
  chevrons: "M8 8l4-4 4 4 M8 16l4 4 4-4",
  "chevron-left": "M15 18l-6-6 6-6",
  "chevron-right": "M9 18l6-6-6-6",
  "arrow-right": "M4 12h16 M14 6l6 6-6 6",
  "arrow-up-right": "M7 17L17 7 M7 7h10v10",
  sparkles:
    "M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z M21 2v4 M19 4h4",
  clock: "M12 8v5l3 2 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  plus: "M12 5v14 M5 12h14",
  close: "M6 6l12 12 M6 18L18 6",
  menu: "M3 6h18 M3 12h18 M3 18h18",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1.5 1.5 M17.5 17.5L19 19 M5 19l1.5-1.5 M17.5 6.5L19 5",
  megaphone: "M3 10v6h5l12 5V5L8 10z M8 16l2 6h4l-2-5 M20 10h2v6h-2",
  gift: "M3 8h18v4H3z M5 12v9h14v-9 M12 8v13 M12 8H8a3 3 0 1 1 3-3z M12 8h4a3 3 0 1 0-3-3z",
  mail: "M3 5h18v14H3z M3 5l9 8 9-8",
  download: "M12 3v12 M7 10l5 5 5-5 M4 16v5h16v-5",
  link: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2",
  shield: "M12 2l9 4v6c0 5-9 10-9 10S3 17 3 12V6z M8 12l3 3 5-6",
  briefcase: "M3 7h18v14H3z M8 7V3h8v4 M3 12c5 4 13 4 18 0 M10 13h4v4h-4z",
  chart: "M4 3v18h18 M8 16v-5 M13 16V7 M18 16v-8",
  circlecheck: "M8 12l3 3 5-6 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  coffee:
    "M3 8h14v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z M17 8h2a3 3 0 0 1 0 6h-2 M6 2v2 M10 2v2 M14 2v2",
  video: "M3 5h12v14H3z M15 9l6-4v14l-6-4",
  pin: "M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13z M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
};
function icon(name) {
  return `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.grid}"/></svg>`;
}
function hydrateIcons(root = document) {
  root
    .querySelectorAll("[data-icon]")
    .forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
}
const escapeHTML = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
// 2. Navigation and fictional sample data. Arrays act as session-only UI state.
const navItems = [
  ["dashboard", "grid", "Overview"],
  ["projects", "folder", "Projects"],
  ["tasks", "check", "My tasks", "8"],
  ["people", "users", "People"],
  ["calendar", "calendar", "Calendar"],
  ["leave", "leaf", "Leave & attendance"],
  ["helpdesk", "ticket", "Help desk", "3"],
  ["documents", "file", "Documents"],
];
const people = [
  {
    name: "Alex Johnson",
    role: "Product Designer",
    department: "Design",
    initials: "AJ",
    email: "alex.johnson@worknest.example",
    color: "a3",
  },
  {
    name: "Sarah Miller",
    role: "Design Lead",
    department: "Design",
    initials: "SM",
    email: "sarah.miller@worknest.example",
    color: "a1",
  },
  {
    name: "James Wilson",
    role: "Frontend Developer",
    department: "Engineering",
    initials: "JW",
    email: "james.wilson@worknest.example",
    color: "a2",
  },
  {
    name: "Emma Davis",
    role: "Product Manager",
    department: "Product",
    initials: "ED",
    email: "emma.davis@worknest.example",
    color: "a4",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    department: "Engineering",
    initials: "MC",
    email: "michael.chen@worknest.example",
    color: "a3",
  },
  {
    name: "Olivia Brown",
    role: "People Partner",
    department: "People & Culture",
    initials: "OB",
    email: "olivia.brown@worknest.example",
    color: "a5",
  },
  {
    name: "Daniel Lee",
    role: "Brand Strategist",
    department: "Marketing",
    initials: "DL",
    email: "daniel.lee@worknest.example",
    color: "a2",
  },
  {
    name: "Sophia Garcia",
    role: "UX Researcher",
    department: "Design",
    initials: "SG",
    email: "sophia.garcia@worknest.example",
    color: "a4",
  },
];
const projects = [
  {
    id: 1,
    name: "Website redesign",
    description:
      "A fresh digital experience. Reimagining our website with people at the heart of every decision.",
    category: "Design team",
    progress: 68,
    status: "In progress",
    icon: "grid",
    color: "",
    due: "Nov 24, 2026",
    members: ["SM", "AJ", "JW"],
    tasks: 24,
    done: 16,
  },
  {
    id: 2,
    name: "Mobile app launch",
    description:
      "Bringing our workspace to everyone, everywhere. Building a thoughtful mobile experience.",
    category: "Product team",
    progress: 42,
    status: "In progress",
    icon: "briefcase",
    color: "green",
    due: "Dec 12, 2026",
    members: ["ED", "MC", "SG"],
    tasks: 32,
    done: 13,
  },
  {
    id: 3,
    name: "Brand guidelines",
    description:
      "One voice, one vision. Creating a consistent identity for the next chapter of our story.",
    category: "Marketing team",
    progress: 90,
    status: "In review",
    icon: "sparkles",
    color: "orange",
    due: "Nov 18, 2026",
    members: ["DL", "SM", "OB"],
    tasks: 18,
    done: 16,
  },
];
const tasks = [
  {
    id: 1,
    title: "Design new dashboard wireframes",
    project: "Website redesign",
    priority: "High",
    status: "In progress",
    due: "Today",
    assignee: "AJ",
  },
  {
    id: 2,
    title: "Review mobile app onboarding flow",
    project: "Mobile app launch",
    priority: "Medium",
    status: "To do",
    due: "Today",
    assignee: "SM",
  },
  {
    id: 3,
    title: "Update the component library",
    project: "Website redesign",
    priority: "Low",
    status: "In progress",
    due: "Tomorrow",
    assignee: "AJ",
  },
  {
    id: 4,
    title: "Prepare assets for developer handoff",
    project: "Brand guidelines",
    priority: "Medium",
    status: "To do",
    due: "Nov 12",
    assignee: "ED",
  },
  {
    id: 5,
    title: "Conduct user feedback session",
    project: "Mobile app launch",
    priority: "High",
    status: "To do",
    due: "Nov 13",
    assignee: "SG",
  },
  {
    id: 6,
    title: "Finalize typography system",
    project: "Brand guidelines",
    priority: "Low",
    status: "Done",
    due: "Nov 8",
    assignee: "AJ",
  },
  {
    id: 7,
    title: "Document accessibility improvements",
    project: "Website redesign",
    priority: "Medium",
    status: "To do",
    due: "Nov 14",
    assignee: "JW",
  },
  {
    id: 8,
    title: "Explore new navigation concepts",
    project: "Website redesign",
    priority: "Low",
    status: "Done",
    due: "Nov 7",
    assignee: "AJ",
  },
];
const leaveRequests = [
  {
    id: 1,
    type: "Annual leave",
    start: "2026-11-19",
    end: "2026-11-20",
    days: 2,
    reason: "A short family trip.",
    status: "Approved",
  },
  {
    id: 2,
    type: "Annual leave",
    start: "2026-12-23",
    end: "2026-12-28",
    days: 4,
    reason: "Winter holidays.",
    status: "Pending",
  },
  {
    id: 3,
    type: "Sick leave",
    start: "2026-10-15",
    end: "2026-10-15",
    days: 1,
    reason: "Medical appointment.",
    status: "Approved",
  },
];
const tickets = [
  {
    id: 1042,
    subject: "Need access to Figma team workspace",
    category: "Software & access",
    priority: "Medium",
    status: "Open",
    date: "Nov 9, 2026",
    description: "Please add my account to the design team workspace.",
  },
  {
    id: 1038,
    subject: "External monitor connection issue",
    category: "Hardware",
    priority: "High",
    status: "In progress",
    date: "Nov 7, 2026",
    description: "My external monitor disconnects occasionally during calls.",
  },
  {
    id: 1024,
    subject: "VPN configuration help",
    category: "Network",
    priority: "Low",
    status: "Resolved",
    date: "Nov 2, 2026",
    description: "Help with the company VPN setup.",
  },
];
const documents = [
  {
    id: 1,
    name: "Employee handbook",
    category: "People & Culture",
    type: "PDF",
    updated: "Nov 6, 2026",
    size: "2.4 MB",
    content:
      "Welcome to WorkNest\n\nEmployee Handbook — Prototype Edition\n\nOur values: be thoughtful, work together, and make room for growth.\n\nWorking hours: Our example team works Monday–Friday, 9 AM–6 PM, with flexible focus time.\n\nLeave: Request time off through Leave & attendance. A manager approval is required in a production workflow.\n\nSupport: Contact the help desk for IT and workplace questions.\n\nThis is sample prototype content, not a company policy.",
  },
  {
    id: 2,
    name: "Brand guidelines 2026",
    category: "Design",
    type: "PDF",
    updated: "Nov 4, 2026",
    size: "8.1 MB",
    content:
      "WorkNest Brand Guidelines\n\nPrimary color: Forest green #1D5D50\nAccent: Soft lime #DCF4AF\nTypography: Manrope headings, DM Sans body.\nVoice: Clear, warm, and considered.\n\nThis text preview is demo content.",
  },
  {
    id: 3,
    name: "Remote work policy",
    category: "People & Culture",
    type: "DOC",
    updated: "Oct 29, 2026",
    size: "340 KB",
    content:
      "Remote Work Policy — Sample\n\nKeep your availability updated, attend core team meetings, and protect confidential information.\nUse secure devices and approved company tools.\n\nThis is prototype policy content only.",
  },
  {
    id: 4,
    name: "Q4 project roadmap",
    category: "Product",
    type: "PDF",
    updated: "Oct 25, 2026",
    size: "1.8 MB",
    content:
      "Q4 Roadmap — Sample\n\nNovember: Website design and brand review.\nDecember: Mobile app testing and launch readiness.\n\nProject dates and goals are sample data.",
  },
  {
    id: 5,
    name: "New starter checklist",
    category: "People & Culture",
    type: "DOC",
    updated: "Oct 21, 2026",
    size: "180 KB",
    content:
      "New Starter Checklist\n\n1. Meet your team.\n2. Set up your company account and device.\n3. Read the employee handbook.\n4. Join your projects.\n5. Book a welcome chat with your manager.\n\nSample content for demonstration.",
  },
];
const events = [
  {
    day: 9,
    month: 10,
    year: 2026,
    time: "10:00 – 10:30 AM",
    name: "Design team standup",
    location: "Google Meet",
    color: "",
    members: ["SM", "JW"],
    description: "A quick check-in on priorities, progress, and any blockers.",
  },
  {
    day: 9,
    month: 10,
    year: 2026,
    time: "02:00 – 03:00 PM",
    name: "Website redesign review",
    location: "Meeting room A",
    color: "purple",
    members: ["ED", "AJ"],
    description: "Review dashboard concepts and share feedback with the team.",
  },
  {
    day: 11,
    month: 10,
    year: 2026,
    time: "11:00 – 11:45 AM",
    name: "Product planning",
    location: "Google Meet",
    color: "orange",
    members: ["ED", "MC"],
    description: "Align on the next mobile app milestones.",
  },
  {
    day: 16,
    month: 10,
    year: 2026,
    time: "03:00 – 04:00 PM",
    name: "Creative catch-up",
    location: "Studio lounge",
    color: "",
    members: ["DL", "SM"],
    description:
      "Space for inspiration, ideas, and a little creative exploration.",
  },
  {
    day: 24,
    month: 10,
    year: 2026,
    time: "02:00 – 03:00 PM",
    name: "Website launch readiness",
    location: "Google Meet",
    color: "purple",
    members: ["AJ", "JW"],
    description: "Final check of the website redesign deliverables.",
  },
];
let page = "dashboard",
  taskTab = "All tasks",
  projectFilter = "All projects",
  peopleFilter = "Everyone",
  peopleQuery = "",
  calendarDate = new Date(2026, 10, 1),
  selectedDay = 9,
  selectedMonth = 10,
  selectedYear = 2026,
  taskFilter = "All tasks",
  documentQuery = "",
  notificationRead = false;
const profile = {
  name: "Alex Johnson",
  role: "Product Designer",
  email: "alex.johnson@worknest.example",
  department: "Design",
};
// 3. Reusable UI components: avatars, badges, headings, and task rows.
function avatar(initials, cls = "") {
  const p = people.find((x) => x.initials === initials);
  return `<span class="avatar ${p?.color || ""} ${cls}" title="${escapeHTML(p?.name || initials)}">${escapeHTML(initials)}</span>`;
}
function stack(members, more = 0) {
  return `<span class="avatar-stack">${members.map((x) => avatar(x)).join("")}${more ? `<span class="avatar more">+${more}</span>` : ""}</span>`;
}
function badge(text, cls) {
  return `<span class="badge ${cls || { High: "high", Medium: "medium", Low: "low", "In progress": "progress", "In review": "pending", Approved: "done", Pending: "pending", Open: "pending", Resolved: "done", Done: "done", "To do": "low" }[text] || "low"}">${escapeHTML(text)}</span>`;
}
function heading(title, description, action = "") {
  return `<section class="page-heading"><div><h1>${title}</h1><p>${description}</p></div>${action}</section>`;
}
function dateButton() {
  return `<div class="date-display">${icon("calendar")}<span>Monday, November 9, 2026</span></div>`;
}
function viewLink(target, label = "View all") {
  return `<button class="text-link" data-page="${target}">${label}${icon("arrow-right")}</button>`;
}
function panelHeader(title, target, label = "View all") {
  return `<header class="panel-header"><h2>${title}</h2>${target ? viewLink(target, label) : ""}</header>`;
}
function renderNav() {
  document.getElementById("main-nav").innerHTML = navItems
    .map(
      ([id, ic, label, count]) =>
        `<button class="nav-item ${page === id ? "active" : ""}" data-page="${id}" ${page === id ? 'aria-current="page"' : ""}>${icon(ic)}<span>${label}</span>${count ? `<span class="nav-count">${id === "tasks" ? tasks.filter((t) => t.status !== "Done").length : tickets.filter((t) => t.status !== "Resolved").length}</span>` : ""}</button>`,
    )
    .join("");
}
function taskRows(list) {
  if (!list.length)
    return `<div class="empty-state">${icon("circlecheck")}<div>You're all caught up.</div><p>A little breathing room looks good on you.</p></div>`;
  return list
    .map(
      (t) =>
        `<div class="task-row ${t.status === "Done" ? "completed" : ""}"><input class="task-checkbox" type="checkbox" data-task-check="${t.id}" aria-label="Mark ${escapeHTML(t.title)} ${t.status === "Done" ? "incomplete" : "complete"}" ${t.status === "Done" ? "checked" : ""}><div class="task-info"><div class="task-title">${escapeHTML(t.title)}</div><div class="task-project"><i></i>${escapeHTML(t.project)}</div></div>${badge(t.priority)}<span class="task-date">${icon("calendar")}${escapeHTML(t.due)}</span>${avatar(t.assignee)}</div>`,
    )
    .join("");
}
// 4. Page templates. Each function returns the HTML for one workspace module.
function dashboard() {
  const visibleTasks = tasks
    .filter(
      (t) =>
        taskTab === "All tasks" ||
        (taskTab === "In progress"
          ? t.status === "In progress"
          : t.status === "Done"),
    )
    .slice(0, 4);
  return (
    heading(
      `Good morning, ${escapeHTML(profile.name.split(" ")[0])} <span class="greeting-leaf">${icon("leaf")}</span>`,
      "Here's what's happening in your workspace today.",
      dateButton(),
    ) +
    `<div class="dashboard-grid"><div class="dashboard-primary"><section class="welcome-banner"><div class="banner-copy"><span class="eyebrow">A LITTLE FOCUS. A LOT OF POSSIBILITIES.</span><h2>Your best work starts<br>with a <em>clear headspace.</em></h2><p>One place for your people, projects, and everything in between.<br>Let's make this a productive day.</p><button class="banner-button" data-page="tasks">Let's get to work ${icon("arrow-right")}</button></div><div class="banner-art" aria-hidden="true"><div class="orbit"></div><div class="orbit two"></div><div class="orbit three"></div><div class="art-flower">${'<span class="petal"></span>'.repeat(6)}<span class="flower-center"></span></div><span class="art-sparkle">✧</span><i class="art-dot"></i></div></section><section class="stats-grid" aria-label="Workspace at a glance">${stat("Active projects", String(projects.length).padStart(2, "0"), "folder", "<b>+1</b> from last month", "projects")}${stat("Tasks completed", String(tasks.filter((t) => t.status === "Done").length + 22), "check", "<b>↑ 12%</b> from last month", "tasks", "/ 32")}${stat("Leave balance", "12", "leaf", "Your next break is waiting", "leave", "days")}${stat("Open tickets", String(tickets.filter((t) => t.status !== "Resolved").length).padStart(2, "0"), "ticket", "<b>1 resolved</b> this week", "helpdesk")}</section><section class="panel tasks-panel">${panelHeader('My tasks <span class="sub-count">' + tasks.length + "</span>", "tasks")}<div class="task-tabs" role="tablist" aria-label="Dashboard task status">${["All tasks", "In progress", "Completed"].map((t, i) => `<button class="tab ${taskTab === t ? "active" : ""}" role="tab" aria-selected="${taskTab === t}" data-task-tab="${t}">${t}<span>${i === 0 ? tasks.length : tasks.filter((x) => x.status === (i === 1 ? "In progress" : "Done")).length}</span></button>`).join("")}</div><div>${taskRows(visibleTasks)}</div></section><section class="panel">${panelHeader("Active projects", "projects")}<div class="projects-list">${projects
      .slice(0, 2)
      .map(
        (p) =>
          `<article class="project-line"><div class="project-main"><button class="project-logo ${p.color}" data-project-detail="${p.id}" aria-label="Open ${p.name}">${icon(p.icon)}</button><div><h3><button data-project-detail="${p.id}" style="padding:0">${p.name}</button></h3><p>${p.category} <span style="margin:0 4px">·</span> ${p.tasks} tasks</p></div>${badge(p.status)}</div><div class="project-progress"><div class="progress-track" role="progressbar" aria-label="${p.name} progress" aria-valuenow="${p.progress}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${p.progress}%;${p.color === "green" ? "background:#b4a4cd" : ""}"></div></div><span class="progress-label">${p.progress}%</span></div><div class="project-footer">${stack(p.members, 2)}<span>Due ${p.due}</span></div></article>`,
      )
      .join(
        "",
      )}</div></section></div><aside class="dashboard-secondary"><section class="panel quick-panel">${panelHeader("Quick actions")}<div class="quick-actions">${[
      ["leave", "leaf", "Request leave"],
      ["ticket", "ticket", "Raise a ticket"],
      ["task", "plus", "Create a task"],
      ["people", "users", "Find a colleague"],
    ]
      .map(
        ([action, ic, label]) =>
          `<button class="quick-action" ${action === "people" ? 'data-page="people"' : `data-action="${action}"`}><span class="action-icon" data-icon="${ic}"></span>${label}</button>`,
      )
      .join(
        "",
      )}</div></section><section class="panel calendar-panel">${panelHeader("Your calendar", "calendar", "View all")}${calendar(false)}${agenda()}</section><section class="panel announcements">${panelHeader("Announcements")}<button class="announcement-item" data-announcement="0"><span class="announcement-icon">${icon("megaphone")}</span><span><h4>We're growing. Meet our new teammates! <i class="new-dot"></i></h4><p>People & Culture <span>·</span> 2 hours ago</p></span></button><button class="announcement-item" data-announcement="1"><span class="announcement-icon">${icon("gift")}</span><span><h4>Save the date: team offsite 2026</h4><p>Company updates <span>·</span> Yesterday</p></span></button></section><div class="bottom-note">${icon("coffee")}Great things happen when we work together.</div></aside></div>`
  );
}
function stat(label, value, ic, foot, target, suffix = "") {
  return `<button class="stat-card" data-page="${target}"><div class="stat-top"><span>${label}</span><span class="stat-symbol">${icon(ic)}</span></div><div class="stat-number"><strong>${value}</strong><small>${suffix}</small></div><div class="stat-foot">${foot}</div></button>`;
}
function calendar(large) {
  const month = calendarDate.getMonth(),
    year = calendarDate.getFullYear(),
    start = new Date(year, month, 1).getDay(),
    days = new Date(year, month + 1, 0).getDate(),
    prev = new Date(year, month, 0).getDate();
  let cells = "";
  for (let i = 0; i < Math.ceil((start + days) / 7) * 7; i++) {
    let day = i - start + 1,
      other = day < 1 || day > days,
      display = day < 1 ? prev + day : day > days ? day - days : day;
    const isToday = !other && day === 9 && month === 10 && year === 2026,
      selected =
        !other &&
        day === selectedDay &&
        month === selectedMonth &&
        year === selectedYear,
      hasEvent =
        !other &&
        events.some(
          (e) => e.day === day && e.month === month && e.year === year,
        );
    cells += `<button class="calendar-day ${other ? "other" : ""} ${isToday ? "today" : ""} ${selected ? "selected" : ""} ${hasEvent ? "has-event" : ""}" data-cal-day="${display}" data-cal-other="${day < 1 ? -1 : day > days ? 1 : 0}" aria-label="${new Date(year, month + (day < 1 ? -1 : day > days ? 1 : 0), display).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}${hasEvent ? ", has events" : ""}" ${selected ? 'aria-pressed="true"' : ""}>${display}</button>`;
  }
  return `<div class="calendar-month"><span>${calendarDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span><div class="calendar-controls"><button data-cal-move="-1" aria-label="Previous month">${icon("chevron-left")}</button><button data-cal-move="1" aria-label="Next month">${icon("chevron-right")}</button></div></div><div class="calendar-grid ${large ? "calendar-large" : ""}">${["S", "M", "T", "W", "T", "F", "S"].map((d) => `<span class="calendar-day-name">${d}</span>`).join("")}${cells}</div>`;
}
function agenda() {
  const list = events.filter(
    (e) =>
      e.day === selectedDay &&
      e.month === selectedMonth &&
      e.year === selectedYear,
  );
  const date = new Date(selectedYear, selectedMonth, selectedDay);
  return `<div class="agenda"><p class="agenda-label">${selectedDay === 9 && selectedMonth === 10 && selectedYear === 2026 ? "TODAY" : date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()} <span style="margin:0 4px;color:#c9cecb">·</span> ${list.length} ${list.length === 1 ? "EVENT" : "EVENTS"}</p>${list.length ? list.map((e) => `<button class="agenda-item ${e.color}" data-event="${events.indexOf(e)}" style="width:100%;text-align:left;padding:0"><span><h4>${escapeHTML(e.name)}</h4><p>${e.time} <span style="margin:0 3px">·</span> ${escapeHTML(e.location)}</p></span>${stack(e.members)}</button>`).join("") : '<p class="muted" style="font-size:10px;padding:7px 0">Nothing scheduled. A little space to focus.</p>'}</div>`;
}
function projectsPage() {
  return (
    heading(
      "Good things, in progress.",
      "A shared view of what your team is building.",
      `<button class="primary-button" data-action="project">${icon("plus")} New project</button>`,
    ) +
    `<div class="view-toolbar"><div class="filter-group">${["All projects", "In progress", "In review"].map((x) => `<button class="filter-button ${projectFilter === x ? "active" : ""}" data-project-filter="${x}">${x}</button>`).join("")}</div><span class="muted" style="font-size:10px">${projects.length} projects in your workspace</span></div><section class="project-cards">${projects
      .filter(
        (p) => projectFilter === "All projects" || p.status === projectFilter,
      )
      .map(
        (p) =>
          `<article class="panel project-card" data-project-detail="${p.id}" tabindex="0" role="button" aria-label="Open ${escapeHTML(p.name)}"><div class="project-main"><span class="project-logo ${p.color}">${icon(p.icon)}</span>${badge(p.status)}</div><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p><div class="project-progress"><div class="progress-track"><div class="progress-fill" style="width:${p.progress}%"></div></div><span class="progress-label">${p.progress}%</span></div><div class="project-footer">${stack(p.members)}<span>Due ${p.due}</span></div></article>`,
      )
      .join("")}</section>`
  );
}
function tasksPage() {
  const list = tasks.filter(
    (t) => taskFilter === "All tasks" || t.status === taskFilter,
  );
  return (
    heading(
      "A little focus goes a long way.",
      "Plan your day, move things forward, and celebrate the small wins.",
      `<button class="primary-button" data-action="task">${icon("plus")} Create task</button>`,
    ) +
    `<div class="view-toolbar"><div class="filter-group">${["All tasks", "To do", "In progress", "Done"].map((x) => `<button class="filter-button ${taskFilter === x ? "active" : ""}" data-task-filter="${x}">${x}</button>`).join("")}</div><span class="muted" style="font-size:10px">${tasks.filter((t) => t.status === "Done").length} of ${tasks.length} completed</span></div><section class="kanban">${[
      "To do",
      "In progress",
      "Done",
    ]
      .map((status) => {
        const statusTasks = list.filter((t) => t.status === status);
        return `<section class="kanban-column"><h2 class="kanban-heading">${status}<span>${statusTasks.length}</span></h2>${statusTasks.map((t) => `<article class="kanban-card">${badge(t.priority)}<h3>${escapeHTML(t.title)}</h3><p>${escapeHTML(t.project)}</p><span class="task-date">${icon("calendar")}${escapeHTML(t.due)}</span><div class="kanban-card-footer">${avatar(t.assignee)}<button class="secondary-button" data-task-move="${t.id}">${status === "To do" ? "Start task" : status === "In progress" ? "Mark complete" : "Reopen"} ${icon("arrow-right")}</button></div></article>`).join("")}${!statusTasks.length ? '<div class="empty-state" style="padding:20px 5px;font-size:10px">Nothing here just yet.</div>' : ""}</section>`;
      })
      .join("")}</section>`
  );
}
function peoplePage() {
  return (
    heading(
      "Great work starts with good people.",
      "Find a familiar face or get to know someone new.",
      `<span class="date-display">${icon("users")} ${people.length} teammates</span>`,
    ) +
    `<div class="view-toolbar"><div class="filter-group">${["Everyone", "Design", "Engineering", "Product", "People & Culture", "Marketing"].map((x) => `<button class="filter-button ${peopleFilter === x ? "active" : ""}" data-people-filter="${x}">${x}</button>`).join("")}</div><label class="view-search">${icon("search")}<input id="people-search" placeholder="Search people..." value="${escapeHTML(peopleQuery)}" aria-label="Search people"></label></div><section class="people-grid" id="people-results">${peopleCards()}</section>`
  );
}
function peopleCards() {
  const list = people.filter(
    (p) =>
      (peopleFilter === "Everyone" || p.department === peopleFilter) &&
      `${p.name} ${p.role}`.toLowerCase().includes(peopleQuery.toLowerCase()),
  );
  return list.length
    ? list
        .map(
          (p) =>
            `<article class="panel person-card">${avatar(p.initials)}<h3>${p.name}</h3><p>${p.role}</p><span class="badge department-pill">${p.department}</span><button class="secondary-button" data-person="${p.initials}">${icon("mail")} View profile</button></article>`,
        )
        .join("")
    : '<div class="empty-state">No teammates found. Try a different name or department.</div>';
}
function leavePage() {
  return (
    heading(
      "Make room for a little recharge.",
      "Your time off, balances, and requests — all in one place.",
      `<button class="primary-button" data-action="leave">${icon("plus")} Request leave</button>`,
    ) +
    `<section class="leave-balance">${[
      ["leaf", "Annual leave", "12", "days available"],
      ["shield", "Sick leave", "07", "days available"],
      ["sun", "Personal leave", "03", "days available"],
    ]
      .map(
        ([ic, label, n, suffix]) =>
          `<article class="panel balance-card"><span class="balance-icon">${icon(ic)}</span><div><h3>${label}</h3><p>${n} <small>${suffix}</small></p></div></article>`,
      )
      .join(
        "",
      )}</section><section class="panel">${panelHeader("My leave requests")}<div class="table-wrap"><table class="data-table"><thead><tr><th>LEAVE TYPE</th><th>DATES</th><th>DURATION</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>${leaveRequests.map((l) => `<tr><td>${escapeHTML(l.type)}</td><td class="muted">${formatDate(l.start)}${l.start !== l.end ? " – " + formatDate(l.end) : ""}</td><td>${l.days} ${l.days === 1 ? "day" : "days"}</td><td>${badge(l.status)}</td><td>${l.status === "Pending" ? `<button class="text-link" data-cancel-leave="${l.id}">Cancel request</button>` : `<button class="text-link" data-leave-detail="${l.id}">View details ${icon("arrow-up-right")}</button>`}</td></tr>`).join("")}</tbody></table></div></section><p class="muted" style="font-size:10px;margin-top:16px">Demo balances are illustrative. New requests stay pending; no real approval or attendance tracking is connected.</p>`
  );
}
function helpdeskPage() {
  return (
    heading(
      "A helping hand, when you need it.",
      "Track your IT requests and get back to doing what you do best.",
      `<button class="primary-button" data-action="ticket">${icon("plus")} Raise a ticket</button>`,
    ) +
    `<div class="demo-notice">This is a demo help desk. Requests are visible during this session and are not sent to an IT team.</div><section class="panel">${panelHeader("My support tickets")}<div class="table-wrap"><table class="data-table"><thead><tr><th>TICKET</th><th>SUBJECT</th><th>PRIORITY</th><th>STATUS</th><th>CREATED</th></tr></thead><tbody>${tickets.map((t) => `<tr><td class="muted">#${t.id}</td><td><button data-ticket-detail="${t.id}" style="padding:0;text-align:left"><strong style="font-weight:550">${escapeHTML(t.subject)}</strong><span class="muted" style="display:block;font-size:9px;margin-top:6px">${escapeHTML(t.category)}</span></button></td><td>${badge(t.priority)}</td><td>${badge(t.status)}</td><td class="muted">${t.date}</td></tr>`).join("")}</tbody></table></div></section>`
  );
}
function documentsPage() {
  return (
    heading(
      "A little knowledge, all together.",
      "The policies, resources, and guides that keep everyone on the same page.",
      `<span class="date-display">${icon("file")} Shared resources</span>`,
    ) +
    `<div class="view-toolbar"><span class="muted" style="font-size:11px">Company documents <span style="margin-left:6px">${documents.length}</span></span><label class="view-search">${icon("search")}<input id="document-search" placeholder="Search documents..." value="${escapeHTML(documentQuery)}" aria-label="Search documents"></label></div><section class="panel"><div class="table-wrap"><table class="data-table"><thead><tr><th>DOCUMENT NAME</th><th>TEAM</th><th>LAST UPDATED</th><th>PREVIEW</th></tr></thead><tbody id="document-results">${documentRows()}</tbody></table></div></section><p class="muted" style="font-size:10px;margin-top:16px">All documents contain sample content. Download provides a readable .txt demo copy, not an original PDF.</p>`
  );
}
function documentRows() {
  const list = documents.filter((d) =>
    d.name.toLowerCase().includes(documentQuery.toLowerCase()),
  );
  return list.length
    ? list
        .map(
          (d) =>
            `<tr><td><span class="document-title"><span class="document-icon">${icon("file")}</span><span>${d.name}<small class="muted" style="display:block;font-size:8px;margin-top:5px">${d.type} resource · sample content</small></span></span></td><td class="muted">${d.category}</td><td class="muted">${d.updated}</td><td><button class="text-link" data-document="${d.id}">Open ${icon("arrow-up-right")}</button></td></tr>`,
        )
        .join("")
    : '<tr><td colspan="4" class="empty-state">No documents match your search.</td></tr>';
}
function settingsPage() {
  return (
    heading(
      "Your workspace, your way.",
      "A few details that make this space feel more like you.",
    ) +
    `<section class="panel settings-panel"><h2>Personal profile</h2><p>Manage the details shown in your prototype workspace.</p><div class="settings-profile">${avatar("AJ")}<div><h3>${escapeHTML(profile.name)}</h3><p>${escapeHTML(profile.role)} · ${escapeHTML(profile.department)}</p></div></div><form id="profile-form"><div class="field-grid">${field("Full name", "name", "text", profile.name)}${field("Job title", "role", "text", profile.role)}${field("Email address", "email", "email", profile.email)}${field("Department", "department", "text", profile.department)}</div><div class="demo-notice">Prototype mode: profile changes last for this browser session. No account, authentication, or real employee record is created.</div><button class="primary-button" type="submit">Save profile ${icon("check")}</button></form><hr class="settings-divider"><h2>About this prototype</h2><p style="margin-top:9px;margin-bottom:0;line-height:1.9">WorkNest is a corporate workspace concept built with Hono, TypeScript, HTML, CSS, and JavaScript. All people, dates, and activity are sample data. Refresh the page to reset your demo.</p></section>`
  );
}
// 5. Client-side routing and rendering. Hash routes also work after a refresh.
function render() {
  renderNav();
  document.getElementById("breadcrumb-current").textContent =
    navItems.find((n) => n[0] === page)?.[2] || "Settings";
  const views = {
    dashboard,
    projects: projectsPage,
    tasks: tasksPage,
    people: peoplePage,
    calendar: () =>
      heading(
        "A little structure for your day.",
        "Make space for the conversations and work that matter.",
        `<button class="primary-button" data-action="event">${icon("plus")} New event</button>`,
      ) +
      `<section class="panel calendar-page">${calendar(true)}${agenda()}</section>`,
    leave: leavePage,
    helpdesk: helpdeskPage,
    documents: documentsPage,
    settings: settingsPage,
  };
  document.getElementById("main-content").innerHTML =
    `<div class="load-in">${(views[page] || dashboard)()}</div>`;
  hydrateIcons();
}
function navigate(target) {
  if (![...navItems.map((n) => n[0]), "settings"].includes(target))
    target = "dashboard";
  page = target;
  history.replaceState(null, "", `#${target}`);
  render();
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebar-overlay").classList.remove("show");
  window.scrollTo({ top: 0, behavior: "instant" });
}
// 6. Accessible dialogs, forms, toast feedback, and resource previews.
let previousFocus;
function modal(title, body, wide = false) {
  previousFocus = document.activeElement;
  document.getElementById("modal-root").innerHTML =
    `<div class="modal-overlay" id="modal-overlay"><section class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><h2 id="modal-title">${title}</h2><button class="icon-button" data-close-modal aria-label="Close dialog">${icon("close")}</button></header><div class="modal-body">${body}</div></section></div>`;
  document.body.style.overflow = "hidden";
  hydrateIcons();
  const focus =
    document.querySelector(".modal input,.modal select,.modal textarea") ||
    document.querySelector(".modal [data-close-modal]");
  setTimeout(() => focus?.focus(), 40);
}
function closeModal() {
  document.getElementById("modal-root").innerHTML = "";
  document.body.style.overflow = "";
  previousFocus?.focus();
}
function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = icon("circlecheck") + `<span>${escapeHTML(message)}</span>`;
  document.getElementById("toast-region").append(el);
  setTimeout(() => el.remove(), 4200);
}
function field(label, name, type = "text", value = "", extra = "") {
  return `<div class="field"><label for="field-${name}">${label}</label><input id="field-${name}" name="${name}" type="${type}" value="${escapeHTML(value)}" required maxlength="150" ${extra}></div>`;
}
function selectField(label, name, options) {
  return `<div class="field"><label for="field-${name}">${label}</label><select id="field-${name}" name="${name}" required>${options.map((o) => `<option>${escapeHTML(o)}</option>`).join("")}</select></div>`;
}
function textareaField(label, name, placeholder = "Add a little context...") {
  return `<div class="field"><label for="field-${name}">${label}</label><textarea id="field-${name}" name="${name}" placeholder="${placeholder}" maxlength="2000" required></textarea></div>`;
}
function formFooter(label) {
  return `<div class="modal-footer"><button class="secondary-button" type="button" data-close-modal>Cancel</button><button class="primary-button" type="submit">${label} ${icon("arrow-right")}</button></div>`;
}
function openForm(type) {
  const forms = {
    task: [
      "One small step forward.",
      `<p class="modal-description">Give your next task a name and a place to call home.</p>${field("Task name", "title", "text", "", 'placeholder="e.g. Review homepage concepts"')}${selectField(
        "Project",
        "project",
        projects.map((p) => p.name),
      )}<div class="field-grid">${selectField("Priority", "priority", ["Medium", "High", "Low"])}${field("Due date", "due", "date", "2026-11-10")}</div>`,
      "Create task",
    ],
    leave: [
      "Make time for yourself.",
      `<p class="modal-description">Choose your dates and we’ll add a demo request to your leave overview.</p>${selectField("Leave type", "type", ["Annual leave", "Sick leave", "Personal leave"])}<div class="field-grid">${field("Start date", "start", "date", "2026-11-16")}${field("End date", "end", "date", "2026-11-16")}</div>${textareaField("Reason", "reason", "A short note for your manager...")}<p class="muted" style="font-size:9px">Workdays are counted Monday–Friday. Demo requests are not sent to a real manager.</p>`,
      "Submit request",
    ],
    ticket: [
      "Let’s get that sorted.",
      `<p class="modal-description">Tell us what’s happening. This demo ticket will appear in your help desk.</p>${field("Subject", "subject", "text", "", 'placeholder="What can we help with?"')}<div class="field-grid">${selectField("Category", "category", ["Software & access", "Hardware", "Network", "Other"])}${selectField("Priority", "priority", ["Medium", "High", "Low"])}</div>${textareaField("Description", "description", "Describe the issue and any steps you have already tried...")}`,
      "Create ticket",
    ],
    project: [
      "Something great starts here.",
      `<p class="modal-description">Create a shared space for your team’s next big idea.</p>${field("Project name", "name", "text", "", 'placeholder="e.g. Customer experience refresh"')}${textareaField("Description", "description")}${field("Due date", "due", "date", "2026-12-01")}`,
      "Create project",
    ],
    event: [
      "Make a little time to connect.",
      `<p class="modal-description">Add an event to your demo workspace calendar.</p>${field("Event name", "name", "text", "", 'placeholder="e.g. Team brainstorm"')}<div class="field-grid">${field("Date", "date", "date", "2026-11-10")}${field("Start time", "time", "time", "10:00")}</div>${field("Location or meeting link", "location", "text", "Google Meet")}`,
      "Create event",
    ],
  };
  const f = forms[type];
  if (f)
    modal(
      f[0],
      `<form id="create-${type}-form">${f[1]}${formFooter(f[2])}</form>`,
    );
}
function formatDate(s) {
  return new Date(s + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
function downloadDoc(id) {
  const doc = documents.find((d) => d.id === id);
  const url = URL.createObjectURL(
    new Blob([doc.content], { type: "text/plain;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-demo.txt";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Your sample document has been downloaded.");
}
function projectDetail(id) {
  const p = projects.find((p) => p.id === id);
  modal(
    escapeHTML(p.name),
    `<p class="modal-description">${escapeHTML(p.description)}</p>${badge(p.status)}<div class="project-progress"><div class="progress-track"><div class="progress-fill" style="width:${p.progress}%"></div></div><span class="progress-label">${p.progress}% complete</span></div><p class="muted" style="font-size:10px;margin:20px 0">Due ${p.due} · ${escapeHTML(p.category)}</p>${stack(p.members)}<h3 style="font-size:12px;margin:25px 0 10px">Project tasks</h3>${taskRows(tasks.filter((t) => t.project === p.name))}<div class="modal-footer"><button class="primary-button" data-project-tasks>View task board ${icon("arrow-right")}</button></div>`,
    true,
  );
}
function notifications() {
  modal(
    "A little heads-up.",
    `<p class="modal-description">You’re up to date with your workspace. All activity shown is sample data.</p><div class="notification-list">${[
      [
        "check",
        "Sarah assigned you a task",
        "Design new dashboard wireframes · 15 minutes ago",
      ],
      [
        "megaphone",
        "A warm welcome to our new teammates",
        "People & Culture · 2 hours ago",
      ],
      [
        "calendar",
        "Design team standup starts at 10 AM",
        "Your calendar · Today",
      ],
    ]
      .map(
        ([ic, t, d]) =>
          `<div class="notification-row"><span class="action-icon" data-icon="${ic}"></span><div><h3>${t}</h3><p>${d}</p></div></div>`,
      )
      .join(
        "",
      )}</div><div class="modal-footer"><button class="primary-button" id="read-notifications">Mark all as read</button></div>`,
  );
}
function openSearch() {
  modal(
    "Find your next thing.",
    `<label class="search-field">${icon("search")}<input id="global-search" placeholder="Search projects, people, documents..." autocomplete="off" aria-label="Search workspace"></label><div class="search-results" id="search-results"><p class="muted" style="font-size:10px;padding:12px">Start typing to find your way around your workspace.</p></div>`,
  );
}
function searchResults(q) {
  const query = q.toLowerCase().trim();
  const list = [
    ...projects.map((p) => ({
      name: p.name,
      type: "Project",
      ic: "folder",
      attr: `data-project-detail="${p.id}"`,
    })),
    ...people.map((p) => ({
      name: p.name,
      type: p.role,
      ic: "users",
      attr: `data-person="${p.initials}"`,
    })),
    ...documents.map((d) => ({
      name: d.name,
      type: "Document",
      ic: "file",
      attr: `data-document="${d.id}"`,
    })),
    ...navItems.map(([id, ic, name]) => ({
      name,
      type: "Workspace page",
      ic,
      attr: `data-search-page="${id}"`,
    })),
  ]
    .filter((x) => query && x.name.toLowerCase().includes(query))
    .slice(0, 8);
  return list.length
    ? list
        .map(
          (x) =>
            `<button class="search-result" ${x.attr}><span>${icon(x.ic)}</span><span><strong>${escapeHTML(x.name)}</strong><small>${escapeHTML(x.type)}</small></span><span>${icon("arrow-up-right")}</span></button>`,
        )
        .join("")
    : `<p class="muted" style="font-size:11px;padding:15px">${query ? "No matches. Try a project, teammate, or page name." : "Start typing to search your workspace."}</p>`;
}
// 7. Event delegation keeps dynamically rendered buttons interactive.
document.addEventListener("click", (e) => {
  const el = e.target.closest('button,[data-project-detail][role="button"]');
  if (e.target.id === "modal-overlay") {
    closeModal();
    return;
  }
  if (e.target.id === "sidebar-overlay") {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-overlay").classList.remove("show");
    return;
  }
  if (!el) return;
  const d = el.dataset;
  if (d.page) {
    navigate(d.page);
    return;
  }
  if (d.searchPage) {
    closeModal();
    navigate(d.searchPage);
    return;
  }
  if (d.closeModal !== undefined) {
    closeModal();
    return;
  }
  if (d.action) {
    openForm(d.action);
    return;
  }
  if (d.taskTab) {
    taskTab = d.taskTab;
    render();
    return;
  }
  if (d.projectFilter) {
    projectFilter = d.projectFilter;
    render();
    return;
  }
  if (d.taskFilter) {
    taskFilter = d.taskFilter;
    render();
    return;
  }
  if (d.peopleFilter) {
    peopleFilter = d.peopleFilter;
    render();
    return;
  }
  if (d.taskMove) {
    const task = tasks.find((t) => t.id === +d.taskMove);
    task.status =
      task.status === "To do"
        ? "In progress"
        : task.status === "In progress"
          ? "Done"
          : "To do";
    render();
    toast(
      task.status === "Done"
        ? "One more win. Task completed!"
        : "Task moved to " + task.status.toLowerCase() + ".",
    );
    return;
  }
  if (d.calMove) {
    calendarDate = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth() + Number(d.calMove),
      1,
    );
    render();
    return;
  }
  if (d.calDay) {
    const newMonth = calendarDate.getMonth() + Number(d.calOther);
    const date = new Date(calendarDate.getFullYear(), newMonth, +d.calDay);
    selectedDay = date.getDate();
    selectedMonth = date.getMonth();
    selectedYear = date.getFullYear();
    calendarDate = new Date(selectedYear, selectedMonth, 1);
    render();
    return;
  }
  if (d.projectDetail) {
    projectDetail(+d.projectDetail);
    return;
  }
  if (d.projectTasks !== undefined) {
    closeModal();
    navigate("tasks");
    return;
  }
  if (d.person) {
    const p = people.find((p) => p.initials === d.person);
    modal(
      escapeHTML(p.name),
      `<div class="settings-profile">${avatar(p.initials)}<div><h3>${p.name}</h3><p>${p.role}</p></div></div><div class="modal-content-copy"><p><strong>Team</strong><br>${p.department}</p><p style="margin-top:15px"><strong>Demo email</strong><br>${p.email}</p><p style="margin-top:17px;font-size:10px">This is a sample teammate profile. Email addresses are fictional.</p></div>`,
    );
    return;
  }
  if (d.document) {
    const doc = documents.find((x) => x.id === +d.document);
    modal(
      doc.name,
      `<p class="modal-description">${doc.category} · Updated ${doc.updated} · Sample document</p><pre class="modal-content-copy" style="white-space:pre-wrap;font-family:inherit">${escapeHTML(doc.content)}</pre><div class="modal-footer"><button class="primary-button" data-download-doc="${doc.id}">${icon("download")} Download demo (.txt)</button></div>`,
      true,
    );
    return;
  }
  if (d.downloadDoc) {
    downloadDoc(+d.downloadDoc);
    return;
  }
  if (d.ticketDetail) {
    const t = tickets.find((x) => x.id === +d.ticketDetail);
    modal(
      "Ticket #" + t.id,
      `<h3 style="font-size:14px;margin-bottom:12px">${escapeHTML(t.subject)}</h3>${badge(t.status)} ${badge(t.priority)}<p class="modal-description" style="margin-top:20px">${escapeHTML(t.description)}</p><p class="muted" style="font-size:10px">${escapeHTML(t.category)} · Created ${t.date}</p>${t.status !== "Resolved" ? `<div class="modal-footer"><button class="primary-button" data-resolve-ticket="${t.id}">Mark resolved ${icon("check")}</button></div>` : ""}`,
    );
    return;
  }
  if (d.resolveTicket) {
    tickets.find((t) => t.id === +d.resolveTicket).status = "Resolved";
    closeModal();
    render();
    toast("Ticket marked as resolved.");
    return;
  }
  if (d.cancelLeave) {
    modal(
      "Cancel this request?",
      `<p class="modal-description">This pending leave request will be removed from your demo overview.</p><div class="modal-footer"><button class="secondary-button" data-close-modal>Keep request</button><button class="primary-button" data-confirm-cancel="${d.cancelLeave}">Cancel request</button></div>`,
    );
    return;
  }
  if (d.confirmCancel) {
    leaveRequests.splice(
      leaveRequests.findIndex((l) => l.id === +d.confirmCancel),
      1,
    );
    closeModal();
    render();
    toast("Leave request cancelled.");
    return;
  }
  if (d.leaveDetail) {
    const l = leaveRequests.find((l) => l.id === +d.leaveDetail);
    modal(
      escapeHTML(l.type),
      `<p class="modal-description">${formatDate(l.start)} – ${formatDate(l.end)} · ${l.days} workdays</p>${badge(l.status)}<p class="modal-content-copy" style="margin-top:20px">${escapeHTML(l.reason)}</p>`,
    );
    return;
  }
  if (d.event) {
    eventDetail(+d.event);
    return;
  }
  if (d.announcement !== undefined) {
    const i = +d.announcement;
    modal(
      i === 0
        ? "New faces, fresh possibilities."
        : "A day away, a little closer together.",
      `<p class="modal-description">${i === 0 ? "People & Culture · November 9, 2026" : "Company updates · November 8, 2026"}</p><div class="modal-content-copy">${i === 0 ? "<p>We’re excited to welcome Sophia Garcia to our Design team and Daniel Lee to Marketing. They bring a fresh perspective and a whole lot of good energy.</p><h3>Say a little hello.</h3><p>Find them in the People directory, and take a moment to make them feel at home.</p>" : "<p>Our 2026 team offsite is coming up on November 27. Expect a day of good conversations, creative sessions, and a little time to step back from the everyday.</p><h3>The details</h3><p>9:30 AM – 4:00 PM · The Garden Studio<br>More details will be shared with the team soon.</p>"}<p style="font-size:9px;margin-top:20px">Sample announcement for the WorkNest prototype.</p></div>`,
    );
    return;
  }
  switch (el.id) {
    case "menu-toggle":
      document.getElementById("sidebar").classList.toggle("open");
      document.getElementById("sidebar-overlay").classList.toggle("show");
      break;
    case "search-trigger":
      openSearch();
      break;
    case "notification-button":
      notifications();
      break;
    case "read-notifications":
      notificationRead = true;
      document.querySelector(".notification-button i")?.remove();
      closeModal();
      toast("You’re all caught up.");
      break;
    case "guide-button":
      modal(
        "A calmer way to work.",
        `<p class="modal-description">Welcome to WorkNest. Take a quick look around your new workspace.</p>${[
          [
            "1",
            "Start with your overview",
            "Check your tasks, project progress, and daily agenda at a glance.",
          ],
          [
            "2",
            "Make something happen",
            "Create a task, request leave, or raise a ticket using Quick actions.",
          ],
          [
            "3",
            "Find your people",
            "Explore the People directory and discover shared company resources.",
          ],
          [
            "4",
            "Make it your own",
            "Update your demo profile in Settings. Everything resets on refresh.",
          ],
        ]
          .map(
            ([n, t, desc]) =>
              `<div class="guide-step"><span>${n}</span><div><h3>${t}</h3><p>${desc}</p></div></div>`,
          )
          .join(
            "",
          )}<div class="demo-notice">Personal prototype · Sample data · No real employee accounts or messages.</div>`,
      );
      break;
    case "workspace-button":
      modal(
        "Your little corner of WorkNest.",
        `<div class="settings-profile"><span class="workspace-logo">S</span><div><h3>Studio workspace</h3><p>Personal prototype · 8 teammates</p></div></div><p class="modal-description">You’re in the Studio demo workspace. Multi-company workspaces and invitations aren’t connected in this prototype.</p><div class="modal-footer"><button class="primary-button" data-close-modal>Back to my workspace</button></div>`,
      );
      break;
  }
});
function eventDetail(index) {
  const event = events[index];
  if (!event) return;
  modal(
    escapeHTML(event.name),
    `<p class="modal-description">${new Date(event.year, event.month, event.day).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p><div class="modal-content-copy"><p>${icon("clock")} ${event.time}</p><p style="margin-top:12px">${icon("pin")} ${escapeHTML(event.location)}</p><p style="margin-top:20px">${escapeHTML(event.description || "A little time to connect with the team.")}</p><h3>Attendees</h3><div style="margin-top:12px">${stack(event.members)}</div><p style="font-size:10px;margin-top:20px">Demo calendar event. No invitation or meeting link is sent.</p></div>`,
  );
}
document.addEventListener("change", (e) => {
  if (e.target.matches("[data-task-check]")) {
    const task = tasks.find((t) => t.id === +e.target.dataset.taskCheck);
    task.status = e.target.checked ? "Done" : "To do";
    if (document.querySelector(".modal")) {
      const pr = projects.find((p) => p.name === task.project);
      render();
      projectDetail(pr.id);
    } else render();
    toast(
      task.status === "Done"
        ? "One more win. Task completed!"
        : "Task moved back to your list.",
    );
  }
});
document.addEventListener("input", (e) => {
  if (e.target.id === "people-search") {
    peopleQuery = e.target.value;
    document.getElementById("people-results").innerHTML = peopleCards();
  }
  if (e.target.id === "document-search") {
    documentQuery = e.target.value;
    document.getElementById("document-results").innerHTML = documentRows();
  }
  if (e.target.id === "global-search")
    document.getElementById("search-results").innerHTML = searchResults(
      e.target.value,
    );
});
// Form submissions validate input and update the demo arrays, not a remote server.
document.addEventListener("submit", (e) => {
  const id = e.target.id;
  if (!id) return;
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (Object.values(data).some((v) => !v.trim())) {
    toast("Please fill in each field before continuing.");
    return;
  }
  if (id === "create-task-form") {
    tasks.unshift({
      id: Date.now(),
      title: data.title.trim(),
      project: data.project,
      priority: data.priority,
      status: "To do",
      due: formatDate(data.due),
      assignee: "AJ",
    });
    closeModal();
    navigate("tasks");
    toast("Your next great idea is on the list.");
  } else if (id === "create-leave-form") {
    if (data.end < data.start) {
      toast("The end date must be on or after the start date.");
      return;
    }
    let days = 0;
    const start = new Date(data.start + "T12:00:00"),
      end = new Date(data.end + "T12:00:00");
    if ((end - start) / 86400000 > 366) {
      toast("Please choose a leave period shorter than one year.");
      return;
    }
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1))
      if (d.getDay() !== 0 && d.getDay() !== 6) days++;
    if (!days) {
      toast("Choose a date range with at least one workday.");
      return;
    }
    leaveRequests.unshift({ id: Date.now(), ...data, days, status: "Pending" });
    closeModal();
    navigate("leave");
    toast("Demo leave request added. A little recharge awaits.");
  } else if (id === "create-ticket-form") {
    tickets.unshift({
      id: Math.max(...tickets.map((t) => t.id)) + 1,
      ...data,
      status: "Open",
      date: "Nov 9, 2026",
    });
    closeModal();
    navigate("helpdesk");
    toast("Your demo ticket is ready to track.");
  } else if (id === "create-project-form") {
    projects.push({
      id: Date.now(),
      name: data.name.trim(),
      description: data.description.trim(),
      category: "Your team",
      progress: 0,
      status: "In progress",
      icon: "folder",
      color: "green",
      due: new Date(data.due + "T12:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      members: ["AJ"],
      tasks: 0,
      done: 0,
    });
    projectFilter = "All projects";
    closeModal();
    navigate("projects");
    toast("A fresh start. Your project has been created.");
  } else if (id === "create-event-form") {
    const date = new Date(data.date + "T12:00:00");
    events.push({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      time: data.time,
      name: data.name.trim(),
      location: data.location.trim(),
      color: "orange",
      members: ["AJ"],
      description: "A new event in your demo workspace.",
    });
    selectedDay = date.getDate();
    selectedMonth = date.getMonth();
    selectedYear = date.getFullYear();
    calendarDate = new Date(selectedYear, selectedMonth, 1);
    closeModal();
    navigate("calendar");
    toast("Your calendar has a little something new.");
  } else if (id === "profile-form") {
    Object.assign(
      profile,
      Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v.trim()])),
    );
    const profileButton = document.querySelector(".profile-button");
    profileButton.querySelector("strong").textContent = profile.name;
    profileButton.querySelector("small").textContent = profile.role;
    render();
    toast("Profile updated for this demo session.");
  }
});
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openSearch();
  }
  if (e.key === "Escape") {
    closeModal();
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-overlay").classList.remove("show");
  }
  if (e.key === "Tab" && document.querySelector(".modal")) {
    const list = [
      ...document.querySelectorAll(
        ".modal button,.modal input,.modal textarea,.modal select,.modal a",
      ),
    ].filter((el) => !el.disabled);
    const first = list[0],
      last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }
  if (
    (e.key === "Enter" || e.key === " ") &&
    e.target.matches('[data-project-detail][role="button"]')
  ) {
    e.preventDefault();
    projectDetail(+e.target.dataset.projectDetail);
  }
});
window.addEventListener("hashchange", () => navigate(location.hash.slice(1)));
hydrateIcons();
navigate(location.hash.slice(1) || "dashboard");
