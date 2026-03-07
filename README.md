# Smart Kitchen API

A Recipe Management REST API built with **ElysiaJS**, **Prisma ORM**, **PostgreSQL**, and **Clerk** authentication.

## Stack

- **[Bun](https://bun.sh/)** — Runtime & package manager
- **[ElysiaJS](https://elysiajs.com/)** — Web framework
- **[Prisma](https://www.prisma.io/)** — Type-safe ORM with split schema files
- **[PostgreSQL](https://www.postgresql.org/)** — Database
- **[Clerk](https://clerk.com/)** — Authentication & user management
- **Swagger/OpenAPI** — Auto-generated docs at `/docs`

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.0+
- PostgreSQL 14+
- [Clerk](https://clerk.com) account

### Installation

```bash
git clone <your-repo>
cd smart-kitchen-api

bun install

cp .env.example .env
# Fill in DATABASE_URL, CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY

bun run db:push       # Push schema to database
bun run db:seed       # (Optional) seed sample data
bun run dev           # Start dev server
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: `3000`) |
| `NODE_ENV` | Environment (`development` / `production`) |
| `DATABASE_URL` | PostgreSQL connection URL |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key (`pk_...`) |
| `CLERK_SECRET_KEY` | Clerk secret key (`sk_...`) |
| `CORS_ORIGIN` | CORS allowed origin (default: `*`) |

## URLs

| URL | Description |
|-----|-------------|
| `GET /docs` | Swagger UI |
| `GET /login-with-clerk` | Clerk login page — get your Bearer token |
| `GET /health` | Health check |

## API Endpoints

> 🔒 = Requires `Authorization: Bearer <token>` (Clerk session token)
>
> Get your token at `/login-with-clerk`

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/private/auth/sync` | Sync Clerk user into local DB (call once after sign-in) 🔒 |
| GET | `/v1/private/auth/me` | Get current user profile 🔒 |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/users` | List all users |
| GET | `/v1/users/:id` | Get user with recipes |
| PUT | `/v1/private/users/:id` | Update user 🔒 |
| DELETE | `/v1/private/users/:id` | Delete user 🔒 |

### Recipes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/recipes` | List recipes (`?q=` to search) |
| GET | `/v1/recipes/:id` | Get recipe with details |
| POST | `/v1/private/recipes` | Create recipe 🔒 |
| PUT | `/v1/private/recipes/:id` | Update recipe 🔒 |
| DELETE | `/v1/private/recipes/:id` | Delete recipe 🔒 |
| POST | `/v1/private/recipes/:id/steps` | Add step 🔒 |
| PUT | `/v1/private/recipes/:id/steps/:stepId` | Update step 🔒 |
| DELETE | `/v1/private/recipes/:id/steps/:stepId` | Delete step 🔒 |
| POST | `/v1/private/recipes/:id/ingredients` | Add ingredient 🔒 |
| PUT | `/v1/private/recipes/:id/ingredients/:ingredientId` | Update ingredient 🔒 |
| DELETE | `/v1/private/recipes/:id/ingredients/:ingredientId` | Remove ingredient 🔒 |
| POST | `/v1/private/recipes/:id/tags/:tagId` | Add tag 🔒 |
| DELETE | `/v1/private/recipes/:id/tags/:tagId` | Remove tag 🔒 |

### Ingredients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/ingredients` | List ingredients |
| GET | `/v1/ingredients/:id` | Get ingredient |
| GET | `/v1/ingredients/:id/recipes` | Recipes using this ingredient |
| POST | `/v1/private/ingredients` | Create ingredient 🔒 |
| PUT | `/v1/private/ingredients/:id` | Update ingredient 🔒 |
| DELETE | `/v1/private/ingredients/:id` | Delete ingredient 🔒 |

### Tags
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/tags` | List tags (`?category=` to filter) |
| GET | `/v1/tags/grouped` | Tags grouped by category |
| GET | `/v1/tags/categories` | All categories |
| GET | `/v1/tags/:id` | Get tag |
| GET | `/v1/tags/:id/recipes` | Recipes with this tag |
| POST | `/v1/private/tags` | Create tag 🔒 |
| PUT | `/v1/private/tags/:id` | Update tag 🔒 |
| DELETE | `/v1/private/tags/:id` | Delete tag 🔒 |

### Cookbooks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/private/cookbooks` | My cookbooks 🔒 |
| GET | `/v1/private/cookbooks/:id` | Get cookbook 🔒 |
| POST | `/v1/private/cookbooks` | Create cookbook 🔒 |
| PUT | `/v1/private/cookbooks/:id` | Update cookbook 🔒 |
| DELETE | `/v1/private/cookbooks/:id` | Delete cookbook 🔒 |
| POST | `/v1/private/cookbooks/:id/recipes` | Add recipe to cookbook 🔒 |
| DELETE | `/v1/private/cookbooks/:id/recipes/:recipeId` | Remove recipe from cookbook 🔒 |

## Project Structure

```
├── public/
│   └── playground.html        # Clerk login + token playground
├── prisma/
│   ├── schema/                # Split Prisma schema files
│   │   ├── 01_config.prisma
│   │   ├── 02_user.prisma
│   │   ├── 03_recipe.prisma
│   │   ├── 04_step.prisma
│   │   ├── 05_ingredient.prisma
│   │   ├── 06_tag.prisma
│   │   └── 07_cookbook.prisma
│   ├── seed.ts
│   └── seeds/
├── src/
│   ├── lib/
│   │   └── prisma.ts
│   ├── routes/
│   │   ├── public/            # GET-only, no auth required
│   │   │   ├── user.routes.ts
│   │   │   ├── recipe.routes.ts
│   │   │   ├── ingredient.routes.ts
│   │   │   └── tag.routes.ts
│   │   └── private/           # Require Clerk Bearer token
│   │       ├── auth.routes.ts
│   │       ├── user.routes.ts
│   │       ├── recipe.routes.ts
│   │       ├── ingredient.routes.ts
│   │       ├── tag.routes.ts
│   │       └── cookbook.routes.ts
│   ├── services/
│   │   ├── user.service.ts
│   │   ├── recipe.service.ts
│   │   ├── ingredient.service.ts
│   │   ├── tag.service.ts
│   │   └── cookbook.service.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── .env
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Dev server with hot reload |
| `bun run start` | Production server |
| `bun run build` | Build to `./dist` |
| `bun run db:generate` | Regenerate Prisma client |
| `bun run db:push` | Push schema to database |
| `bun run db:migrate` | Create and apply migration |
| `bun run db:migrate:prod` | Deploy migrations in production |
| `bun run db:seed` | Seed database with sample data |
| `bun run db:studio` | Open Prisma Studio |
| `bun run db:reset` | Reset database |

## License

MIT
