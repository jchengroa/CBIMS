# Changelog

Welcome to the CBIMS changelog! This document highlights the history of updates, improvements, and milestones in a simplified format tailored for our users and team members.

## [v2.1.0] - Modular Architecture, Draggable Sheets & Settings Upgrades (Current Release)

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
* **TypeScript Compilation Fix:** Resolved a compilation error in `Navigation.tsx` by destructuring the `logoText` prop correctly.
* **Theme Accent Update:** Removed colored gradients, replacing them with a sleek, professional monochrome theme (black backgrounds with white/black accents).
* **Controlled Switch Fix:** Fixed a React checkbox state bug on the settings toggles by converting static/unimplemented rows into controlled disabled states.
* **Viewport Clipping Fix:** Corrected viewport clipping bugs on large monitors by swapping root `100vw` measurements for `100%` to handle scrollbar widths correctly.
* **Git Clean Up:** Created a standard `.gitignore` file and untracked local dependencies (`node_modules/`, `dist/`) from the repository history to fix deployment errors (Exit Code 126).
* **Standardized CSS:** Defined standard `background-clip` rules beside Webkit variants for logo text rendering.

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