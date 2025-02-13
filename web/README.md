# Web MonoRepo for Arm Stabilizer

This is a monorepo for the Arm Stabilizer project. It contains the following packages:

- `api`: an [Express](https://expressjs.com/) server
- `dashboard`: a [Next.js](https://nextjs.org/) app

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v >=18)
- [pnpm](https://pnpm.io/) (v = 10.0.0)

### Installation

1. Clone the repository

```bash
git clone https://github.com/amineNouabi/arm-stabilizer

cd arm-stabilizer/web

pnpm install
```

2. Start the development server

```bash
pnpm dev
```

### Apps and Packages

- `api`: an [Express](https://expressjs.com/) server
- `dashboard`: a [Next.js](https://nextjs.org/) app

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
