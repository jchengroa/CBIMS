# Changelog

Welcome to the CBIMS changelog! This document highlights the history of updates, improvements, and milestones in a simplified format tailored for our users and team members.

## [v2.3.0] - PocketBase Database & Authentication Integration (Current Release)

This release connects the CBIMS React frontend to a live backend database powered by PocketBase, providing persistent user authentication, profiles, real-time SSE syncing, and local offline fallbacks.

### 🌟 New Features & Enhancements
* **PocketBase Integration:**
  - Integrated the official `pocketbase` JS SDK to coordinate authentication, session management, and profile updates.
  - Replaced the simple static `localStorage` session state with PocketBase's reactive `pb.authStore` session hooks.
  - Unified user logins: Username, Email, and Employee ID logins are mapped directly to their corresponding PocketBase email address under the hood to target the same database record.
* **Auto-Registration & Validation Padding:**
  - Implemented an automatic client-side registration helper that creates default `admin` and `user` accounts in PocketBase upon their first login attempt.
  - Resolved PocketBase's default 8-character password length constraint by padding shorter mock passwords on the fly (e.g. `"admin"` becomes `"admin000"`, `"user"` becomes `"user0000"`) so default developer credentials remain easy to type.
* **PocketBase Health Indicator:**
  - Integrated a live background health diagnostic checker (`fetch` loop) in the Login card.
  - Added visual color status dots to both the minimized and maximized default test credentials panels, warning developers if the database server is offline.
* **Smart Connection Fallbacks:**
  - Added an offline fallback mechanism: if the PocketBase database is offline or unreachable, the system automatically falls back to local mock authentication so front-end testing is not interrupted.

---

## [v2.2.0] - Modular Login, Security Settings & Account Profile

This release implements a modern Login System with RBAC controls, dynamic credential formats, and a brand-new Account Profile workspace.

### 🌟 New Features & Enhancements
* **Modular Login Screen:**
  - Designed a modern, minimalist Login screen layout matching the CBIMS monochrome theme.
  - Features high-fidelity inputs with eye toggle visibility controls, dynamic placeholders, and delayed mock validations.
  - Keeps the interface highly streamlined and clean by omitting non-essential action links.
  - Implemented a companion Forgot Password sub-module to request password resets.
* **Role-Based Access Control (RBAC):**
  - Implemented a modular security hook supporting mock validation rules and login sessions.
  - Configured two default test credentials: Admin (`admin` / `admin`, role: `'admin'`) and User (`user` / `user`, role: `'user'`).
  - Added user profile section and "Sign Out" button to the sidebar navigation drawer (desktop) and rail (tablet).
  - Restricted the **Developer Options & Flags** settings category: it is now only visible to users with the `'admin'` role, while regular `'user'` roles are restricted to appearance/regional configs.
* **Profile Workspace Module:**
  - Implemented the Profile module and styles allowing users to edit display names, emails, phone numbers, and ERP organization attributes (Job Title, Department).
  - Built password-changing controls validating current credentials and matching secure guidelines before confirmation.
  - Linked profile avatar editing: supports mock local file uploads (base64 reader converter) and image URLs to dynamically synchronize avatars across headers, rails, and sidebars.
* **Interactive Navigation triggers:**
  - Clicking on the profile avatar panel inside the Sidebar Drawer (desktop), Navigation Rail (tablet), or Bottom Sheet (mobile) routes directly to the Profile Workspace.
* **Developer Options Flags:**
  - Added the `login-field-type` ("Login Field Identifier Type") select flag, allowing developers to switch the primary identifier input field on the login card between *Username / Email*, *Username*, *Email*, or *Employee ID* dynamically.
  - Promoted the Login system to a production-ready entry barrier; the app now defaults to the Login Screen if no authenticated user session is detected.

---

## [v2.1.0] - Modular Architecture, Draggable Sheets & Settings Upgrades

This release introduces code modularization, natural touch gestures, and a professional monochrome interface designed for enterprise use.

### 🌟 New Features & Enhancements
* **Chrome-like Developer Flags:** Added a custom `useFlags` hook and state provider to configure experimental flags (persisted in `localStorage`).
* **Active Flag UI Integrations:**
  - `developer-company-alias`: Instantly overrides header and sidebar company logo branding.
  - `wms-layout-version`: Toggles the Inventory dashboard in real time between Grid cards, Kanban columns, and Compact registry tables.
  - `enable-double-ledger`: Toggles the scaffolded Finance workspace to show an active General Ledger debits/credits journal ledger.
* **Modular Settings Architecture:** Fully abstracted the settings view into a standalone `SettingsModule` component to keep the codebase maintainable and structured.
* **Component & Hook Abstraction:** Abstracted shared layout elements like `GlowElements` (background effects), `GlassCard` (workspace container), and `useCommandPalette` (Ctrl+K keyboard listener hook) out of the main application entry point.
* **Draggable Mobile Bottom Sheet:** Implemented fluid, zero-latency drag-to-close gestures on mobile devices. Dragging the "More Modules" sheet down past 80px closes it, while shorter drags snap back up with a premium feel.
* **Professional Settings Interface:** Redesigned the settings workspace into clean, categorised rows (Appearance, Localization, Security) using custom HTML/CSS toggle switches instead of emojis.
* **Compact Mobile Navbar:** Removed text labels from the mobile bottom navigation bar and reduced its height to `56px` for an elegant, icon-only layout.
* **Natural Page Scrolling:** Removed viewport vertical lock limitations, allowing the page to scroll naturally on large screens while keeping the side navigation drawer and rail sticky in place.
* **Settings Metadata Footer:** Appended a system information footer inside settings showcasing software version `v2.1.0`, creator `@jchengroa`, and build details.

### 🛠️ Compatibility & Performance Fixes
* **TypeScript Compilation Fix:** Resolved a compilation error in the navigation panel by destructuring the logoText prop correctly.
* **Theme Accent Update:** Removed colored gradients, replacing them with a sleek, professional monochrome theme (black backgrounds with white/black accents).
* **Controlled Switch Fix:** Fixed a React checkbox state bug on the settings toggles by converting static/unimplemented rows into controlled disabled states.
* **Viewport Clipping Fix:** Corrected viewport clipping bugs on large monitors by swapping root width measurements to handle scrollbar widths correctly.
* **Git Clean Up:** Created a standard Git ignore configuration file and untracked local dependencies from the repository history to fix deployment errors.
* **Standardized CSS:** Defined standard background clip rules beside Webkit variants for logo text rendering.

---

## [v2.0.0] - Transition to ERP & Premium Interface

This release marks the evolution of **CloudBased** from a simple asset-tracking utility into a comprehensive, modular Enterprise Resource Planning (ERP) platform.

### 🌟 New Features & Enhancements
* **Full ERP Core:** Expanded beyond simple inventory tracking to include modules for financial double-entry bookkeeping, multi-warehouse tracking, supplier relationship logs, and customer limit controls.
* **Premium User Experience:** Implemented a state-of-the-art dark-mode dashboard with interactive hover effects and fluid micro-animations.
* **Command Palette Integration:** Added a smart command search palette allowing users to quickly navigate, run operations, and find resources across the entire system.
* **Enhanced Access Controls:** Added robust, role-based permission settings to keep data secure.

### 🛠️ Compatibility & Performance Fixes
* **Browser Rendering Improvements:** Enhanced styling rules to ensure logo gradients and layout animations display correctly across all modern web browsers (including Safari, Firefox, and Chrome).

---

## [v1.0.0] - CloudBased (Legacy)

The original version of the system.