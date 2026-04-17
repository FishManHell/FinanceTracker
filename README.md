# FinanceTracker

[![CI](https://github.com/FishManHell/FinanceTracker/actions/workflows/ci.yml/badge.svg)](https://github.com/FishManHell/FinanceTracker/actions/workflows/ci.yml)

FinanceTracker is a full-stack personal finance application built to help users manage their budgets, accounts, income, and expenses in one place.
It provides a clean and intuitive interface for tracking financial activity, monitoring spending, and staying organized.

**Live demo:** [fishmanfinancetracker.netlify.app](https://fishmanfinancetracker.netlify.app/sign_in) (UI — Netlify)
**API:** [finance-tracker-one-xi.vercel.app](https://finance-tracker-one-xi.vercel.app) (GraphQL — Vercel)

---

## Features

- Create and manage financial accounts
- Set and update monthly budgets
- Add and delete income and expense transactions
- View monthly financial summaries
- Track overall balance, income, and expenses
- Manage user profiles and avatars
- Role-based user management
- Responsive and user-friendly interface
- Form validation and error handling
- Query caching and mutation handling

---

## Tech Stack

### Frontend
- Vue 3
- TypeScript
- PrimeVue
- Pinia
- TanStack Query
- Apollo Client
- SCSS Modules

### Backend
- Node.js
- Express
- Apollo Server
- GraphQL

### Database
- MongoDB

### Additional Tools
- JWT Authentication
- Vite

---

## Project Overview

The project consists of two separate parts:

- **Client** — responsible for the user interface, reusable components, state management, and API integration
- **Server** — responsible for authentication, GraphQL resolvers, business logic, and database communication

FinanceTracker was built as a personal full-stack project focused on creating a scalable and maintainable financial management application with a modern frontend architecture.

---

## Main Pages

- **Dashboard** — overview of budget, balance, income, and expenses
- **Budget Management** — manage monthly budgets and track financial activity
- **Profile** — manage personal information and avatar
- **Administration** — manage users and roles

---

## Highlights

- Full-stack architecture with separate client and server
- GraphQL API integration with Apollo Client and Apollo Server
- Reusable and scalable UI patterns
- Role-based access and permissions
- Structured data management and API communication
- Clean dashboard-style interface for better user experience

---

## Project Structure

```
FinanceTracker/
├── client/          # Vue 3 SPA (Feature-Sliced Design)
│   └── src/
│       ├── app/         # app-wide setup, providers, router
│       ├── pages/       # route-level components
│       ├── widgets/     # composite UI blocks
│       ├── features/    # user-facing features (forms, filters)
│       ├── entities/    # domain models + API layer
│       └── shared/      # reusable UI, hooks, config
├── server/          # Node.js + Apollo Server GraphQL API
│   └── src/
│       ├── graphql/     # schema, resolvers, type defs
│       ├── models/      # MongoDB collection types
│       ├── services/    # shared business logic
│       └── utils/       # auth, errors, permissions
└── .github/workflows/   # CI pipelines
```

The client follows **Feature-Sliced Design** — layers are isolated and dependencies flow downward (`app` → `pages` → `widgets` → `features` → `entities` → `shared`).

The server uses Node's native **subpath imports** (`#utils/*`, `#models/*`, etc. in `package.json`) instead of relative paths — resolved at runtime without build tooling.

---

## Getting Started

### Prerequisites

- Node.js `22.x`
- npm `10+`
- MongoDB instance (local or Atlas)
- Cloudinary account (for avatar uploads)

### Environment variables

**Server** (`server/.env`):

```bash
MONGODB_URI=mongodb://...
JWT_SECRET=...
TOKEN_LIVE_CYCLE=600000           # access-token TTL in ms
CORS_BASE_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

**Client** (`client/.env`):

```bash
VITE_GRAPHQL_URL=http://localhost:8000/graphql
```

### Run locally

```bash
# Server
cd server
npm install
npm run dev            # starts on http://localhost:8000

# Client (in another terminal)
cd client
npm install
npm run dev            # starts on http://localhost:5173
```

---

## Deployment

- **Client** → **Netlify**: built via `npm run build`, served as a static SPA from `client/dist`.
- **Server** → **Vercel**: deployed as a serverless function via `@vercel/node`, entrypoint `server/src/index.ts`.

Every push to `main` triggers a new deploy. CI (type-check + lint + build for both apps) runs in parallel on every push and PR.
