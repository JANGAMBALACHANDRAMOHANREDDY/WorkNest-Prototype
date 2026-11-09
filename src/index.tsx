import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

const app = new Hono();
app.use("/static/*", serveStatic({ root: "./public" }));
app.get("/api/health", (c) =>
  c.json({ status: "ok", app: "WorkNest", mode: "prototype" }),
);
app.get("/", (c) =>
  c.html(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="theme-color" content="#174f46"><meta name="description" content="WorkNest — a calmer place to do your best work. Your team's projects, people, and everyday essentials in one workspace."><title>WorkNest — Your workspace, together</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='12' fill='%23174f46'/%3E%3Cpath d='M9 13l5 15 6-12 6 12 5-15' fill='none' stroke='%23dcf5b0' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Manrope:wght@400;500;600;650;700;750;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/static/style.css"></head><body>
<aside class="sidebar" id="sidebar"><a class="brand" href="#dashboard" aria-label="WorkNest home"><span class="brand-mark"><svg width="26" height="26" viewBox="0 0 32 32"><path d="M4 8l6 17 6-13 6 13 6-17" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>WorkNest<span class="brand-dot">.</span></a>
<button class="workspace-switch" id="workspace-button"><span class="workspace-logo">S</span><span><strong>Studio workspace</strong><small>Personal workspace</small></span><span data-icon="chevrons" class="icon small"></span></button>
<p class="nav-label">WORKSPACE</p><nav id="main-nav" aria-label="Main navigation"></nav>
<div class="sidebar-bottom"><div class="help-card"><span class="help-symbol" data-icon="sparkles"></span><h3>A little help, a long way.</h3><p>Make the most of your<br>everyday workspace.</p><button id="guide-button">Explore the quick guide <span data-icon="arrow-up-right"></span></button></div><button class="settings-button" data-page="settings"><span data-icon="settings"></span>Settings</button><button class="profile-button" data-page="settings"><span class="avatar profile-avatar">AJ</span><span><strong>Alex Johnson</strong><small>Product Designer</small></span><span data-icon="chevrons" class="small"></span></button></div></aside>
<div class="sidebar-overlay" id="sidebar-overlay"></div>
<div class="app-shell"><header class="topbar"><div class="breadcrumb"><button class="mobile-toggle icon-button" id="menu-toggle" aria-label="Open menu"><span data-icon="menu"></span></button><span class="breadcrumb-home" data-icon="home"></span><span class="breadcrumb-divider">/</span><span id="breadcrumb-current">Overview</span></div><div class="topbar-actions"><button class="search-trigger" id="search-trigger"><span data-icon="search"></span><span>Search anything...</span><kbd>⌘ K</kbd></button><span class="topbar-separator"></span><button class="icon-button notification-button" id="notification-button" aria-label="Notifications"><span data-icon="bell"></span><i></i></button><button class="avatar top-avatar" data-page="settings" aria-label="Your profile">AJ</button></div></header>
<main id="main-content" tabindex="-1"></main><footer class="app-footer"><span>Made for better workdays.</span><span><i class="status-dot"></i> All systems operational <span class="footer-divider">|</span> WorkNest prototype</span></footer></div>
<div id="toast-region" class="toast-region" aria-live="polite"></div><div id="modal-root"></div><script src="/static/app.js" defer></script></body></html>`),
);
export default app;
