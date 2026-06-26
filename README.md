# CBIMS (Cloud-Based Inventory Management System & ERP)

Welcome to **CBIMS** (Cloud-Based Inventory Management System), the next-generation, enterprise-grade ERP (Enterprise Resource Planning) platform. CBIMS succeeds the original **CloudBased** project, shifting from a pure inventory tracking application to a fully modular, highly structured, and scalable ERP suite designed for modern cloud infrastructure.

---

## 🌟 Vision & Key Objectives

CBIMS is engineered to be a comprehensive business management command center. Our development focuses on:
*   **Modular Architecture:** Independent yet highly integrated modules (Inventory, Finance, CRM, Supply Chain) ensuring maintainability and ease of scaling.
*   **Robust Access Control (RBAC):** Enhanced multi-user permission systems with granular control over modules (hubs) and specific actions.
*   **Data Integrity & Sync:** A unified, real-time data sync layer capable of handling high-concurrency transactions across warehouses.
*   **Premium UX/UI:** An intuitive, dark-mode optimized dashboard featuring vibrant visualizations, micro-animations, and seamless multi-device navigation.

---

## 📦 System Modules

### 🟢 Implemented / Scaffolded Modules
*   **Navigation System:** Responsive sidebar layout featuring interactive categorization (Core, Operations, Management).
*   **Dashboard:** Main overview workspace layout.
*   **Inventory (WMS):** Scaffolded layout structure.
*   **Supply Chain:** Scaffolded procurement layout.
*   **Partners:** Scaffolded CRM/SRM portal.
*   **Finance & Ledger:** Scaffolded accounting workspace.
*   **Human Resources:** Scaffolded staff management panel.
*   **Command Palette:** Intelligent global search and quick navigation panel activated by hotkey (`Ctrl + K`).

### 🟡 Proposed / Planned Modules
*   **Multi-Warehouse Tracking:** Real-time stock levels sync across geographical locations.
*   **Unit of Measure (UOM) Engine:** Dynamic unit conversions (e.g. Pallets to Boxes to Units).
*   **Smart Reordering & Alerts:** Automated safety stock replenishment triggers.
*   **Supplier & Customer Directory:** Performance scorecards, contract tracking, credit limits, and logs.
*   **PO & SO Workflows:** Automatic PO generation, approvals, and dispatch fulfillment tracking.
*   **General Ledger & Journals:** Double-entry journal postings for inventory valuations, COGS, and sales revenues.
*   **Access Control (RBAC):** Granular user role permissions matrix and system-wide audit logging.

---

## 🛠️ Tech Stack

### 🟢 Actual Tech Stack
*   **Frontend:** React (v18.3) with TypeScript.
*   **Build Tool:** Vite (v5.3).
*   **Styling:** CSS Modules & Vanilla CSS with custom design system variables.
*   **State Management:** React local state (`useState`, `useEffect`) and props.

### 🟡 Proposed / Planned Additions
*   **Global State Management:** Redux Toolkit or React Context API.
*   **Backend Services:** Node.js (Express / NestJS) API gateway.
*   **Database:** PostgreSQL (with Prisma or TypeORM) for transactional safety, and Redis for caching.

---

## 📂 Current Project Structure

```directory
CBIMS/
├── src/
│   ├── components/
│   │   └── Navigation/
│   │       ├── CommandPalette.module.css
│   │       ├── CommandPalette.tsx
│   │       ├── Navigation.module.css
│   │       └── Navigation.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── CHANGELOG.md
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🚀 Getting Started

*(Detailed installation and configuration guidelines will be updated as the environment setup progresses).*

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18.x or higher)
*   [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) package manager
*   [Docker](https://www.docker.com/) (recommended for local PostgreSQL/Redis environments)

---
