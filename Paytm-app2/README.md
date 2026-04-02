# Paytm-app2

## Project Overview

`Paytm-app2` is a Turborepo-based payment system simulator inspired by how a real wallet product like Paytm could be built in production. The aim is to model more than just screens and CRUD flows. This repo is intended to simulate a complete payments ecosystem with user and merchant frontends, wallet balances, bank deposits, peer-to-peer transfers, asynchronous bank callbacks, queue-based sweepers, and mock banking providers that make the end-to-end system testable locally.

The project uses PostgreSQL with Prisma as the shared data layer, and the monorepo structure is designed so multiple apps and backend services can evolve together while reusing the same database client, UI components, TypeScript config, Tailwind config, and shared state utilities.

## What Exists Today

From the current codebase, the project already has a meaningful core in place:

- a `user-app` Next.js frontend for user-facing wallet flows,
- a `merchant-app` Next.js frontend for merchant-facing flows,
- a `bank-webhook` Node/Express service that receives a bank callback and updates transaction state and balances,
- a shared Prisma/PostgreSQL package with schema, migrations, generated client, and seed data,
- shared monorepo packages for UI, store, ESLint, Tailwind, and TypeScript configuration.

The existing Prisma schema already models the main payment entities:

- `User`
- `Merchant`
- `Balance`
- `OnRampTransactions`
- `P2Ptransfers`

The current implementation already supports or partially supports:

- credential-based authentication for users and merchants,
- add-money / on-ramp transaction creation,
- wallet balance tracking,
- peer-to-peer transfers between users,
- webhook-driven balance updates after a bank deposit is confirmed.

## Intended Architecture

The longer-term goal is to turn this into a much more realistic payments sandbox with multiple independently running services.

Planned frontend apps:

- `apps/user-app`: the end-user wallet experience.
- `apps/merchant-app`: the merchant-facing dashboard and payment-facing surface.

Current and planned backend services:

- `apps/bank-webhook`: receives external or simulated bank callbacks and updates internal transaction state.
- a webhook-facing integration layer that listens to mock bank APIs.
- a user withdrawal sweeper queue service.
- a bank sweeper queue service.

Planned external simulation layer:

- mock banking APIs that behave like bank partners and let the full payment lifecycle be exercised locally without relying on real providers.

## Monorepo Structure

- `apps/user-app`: Next.js app running on port `3001`.
- `apps/merchant-app`: Next.js app running on port `3000`.
- `apps/bank-webhook`: Express service currently listening on port `3003`.
- `packages/db`: Prisma schema, migrations, generated client exports, and seed script.
- `packages/ui`: shared React UI components.
- `packages/store`: shared state/hooks package.
- `packages/tailwind-config`: shared Tailwind configuration.
- `packages/eslint-config`: shared lint rules.
- `packages/typescript-config`: shared TypeScript base configs.

## Product Goal

The intended end state is a full-stack payments playground where:

- users can authenticate, add money, transfer funds, and inspect wallet state,
- merchants can operate through a separate client application,
- banks are represented through mock APIs rather than hardcoded placeholders,
- asynchronous banking events are handled by dedicated backend services,
- sweepers and queues mimic real settlement and withdrawal workflows,
- PostgreSQL and Prisma act as the single source of truth across all services.

In short, this repo is being built as a realistic monorepo simulation of a wallet plus banking ecosystem rather than a simple demo app.

## Current Gaps

Some important parts are clearly planned but not fully implemented yet:

- the mock banking APIs still need to be built,
- the withdrawal sweeper and bank sweeper services are not present yet,
- some screens are still placeholders,
- some bank-facing flows still use temporary assumptions or mocked tokens.

That is expected at this stage. The existing code already establishes the main entities and transaction flows, and the next phase is about expanding those flows into a more production-like distributed system.

## Local Development

Install dependencies from the monorepo root:

```bash
npm install
```

Run all workspace dev tasks through Turborepo:

```bash
npm run dev
```

Useful root scripts:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run check-types`
- `npm run format`

## Notes

This project sits in a nice middle ground between a learning repo and a systems-design sandbox. It already demonstrates core payment ideas such as transaction state, balance mutation, row-level locking for transfers, and webhook-based settlement. The roadmap is to push it closer to how a real digital wallet system behaves under asynchronous, multi-service conditions.
