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

CBIMS scales beyond simple inventory to include the following core ERP modules:

### 1. Inventory & Asset Management (Core WMS)
*   **Multi-Warehouse Tracking:** Real-time tracking of stock levels across multiple geographical locations.
*   **Unit of Measure (UOM) Engine:** Dynamic UOM conversions (e.g., pallets to boxes, boxes to units).
*   **Smart Reordering & Alerts:** Automated stock replenishment recommendations based on lead times and safety stock levels.

### 2. Partner Directory (CRM & SRM)
*   **Supplier Relationship Management (SRM):** Performance scorecards, contract management, and lead-time tracking.
*   **Customer Relationship Management (CRM):** Order history, customer credit limits, and interaction logs.

### 3. Supply Chain & Procurement
*   **Purchase Orders (PO):** Automation of PO generation, authorization workflows, and receiving logs.
*   **Sales Orders (SO):** Fulfillment tracking, invoice generation, and dispatch scheduling.

### 4. Financials & Accounting (New ERP Layer)
*   **General Ledger & Journals:** Automated booking of inventory valuations, cost of goods sold (COGS), and sales revenue.
*   **Accounts Payable/Receivable:** Tracking invoices, bill payments, and cash-flow forecasting.

### 5. Multi-User, RBAC & Security
*   **Role-Based Access Control:** Pre-configured roles (Admin, Warehouse Manager, Accountant, Procurement Specialist) with custom permission matrices.
*   **Session & Security Logging:** Detailed audit trails tracking all insert, update, and delete actions.

---

## 🛠️ Proposed Tech Stack

To ensure high performance and structured maintainability, CBIMS leverages:

*   **Frontend:** React / Next.js with TypeScript for typed safety and modular UI component development.
*   **Styling:** Modern CSS / CSS Modules with variable-driven design systems (supporting Dark/Light themes).
*   **State Management:** Redux Toolkit or React Context API for global state sync.
*   **Backend Services:** Node.js (Express / NestJS) for server-side logic and robust API gateways.
*   **Database:** PostgreSQL (with Prisma or TypeORM) for relational transaction safety, alongside Redis for caching.

---

## 📂 Proposed Project Structure

```directory
CBIMS/
├── apps/                         # Monorepo workspaces or applications
│   ├── web/                      # Main Next.js/React frontend app
│   └── api/                      # Backend services API
├── packages/                     # Shared workspaces
│   ├── database/                 # Prisma schemas, migrations, and seeds
│   ├── ui/                       # Shared design system & React component library
│   └── config/                   # ESLint, TSConfig, and build configurations
├── docs/                         # Extended API and developer documentation
└── README.md                     # Project entry point
```

---

## 🚀 Getting Started

*(Detailed installation and configuration guidelines will be updated as the environment setup progresses).*

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18.x or higher)
*   [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) package manager
*   [Docker](https://www.docker.com/) (recommended for local PostgreSQL/Redis environments)

---

## 📜 Version History

*   **v1.0.0 (CloudBased):** The initial single-user/basic multi-user asset tracking platform.
*   **v2.0.0 (CBIMS):** Comprehensive ERP expansion with modular design, full double-entry ledger integration, and multi-warehouse capabilities.
