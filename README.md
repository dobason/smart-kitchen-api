# Smart Kitchen API - ElysiaJS + Prisma

A Recipe Management REST API built with **ElysiaJS** and **Prisma ORM** for PostgreSQL, using **Clerk** for authentication.

## Features

- **ElysiaJS** - Fast Bun web framework
- **Prisma ORM** - Type-safe database access with split schema files
- **PostgreSQL** - Relational database
- **Clerk** - Authentication and user management
- **Swagger/OpenAPI** - Auto-generated API docs at `/swagger`

## Database Schema

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   users     │────<│   recipes   │>────│   steps     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │
      ▼                   ▼
┌─────────────┐     ┌─────────────────────┐
│  cookbooks  │     │  recipe_ingredients │
└─────────────┘     └─────────────────────┘
      │                   │
      ▼                   ▼
┌─────────────────┐ ┌─────────────┐
│ cookbook_recipes│ │ ingredients │
└─────────────────┘ └─────────────┘

┌─────────────┐     ┌─────────────┐
│ recipe_tags │────>│    tags     │
└─────────────┘     └─────────────┘
```

## Project Structure

```
├── prisma/
│   ├── schema/            # Database schema (split by model)
│   │   ├── 01_config.prisma
│   │   ├── 02_user.prisma
│   │   ├── 03_recipe.prisma
│   │   ├── 04_step.prisma
│   │   ├── 05_ingredient.prisma
│   │   ├── 06_tag.prisma
│   │   └── 07_cookbook.prisma
│   ├── seed.ts            # Seed orchestrator
│   └── seeds/             # Seed data per model
├── src/
│   ├── lib/
│   │   └── prisma.ts      # Prisma client singleton
│   ├── middleware/
│   │   └── auth.middleware.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── recipe.routes.ts
│   │   ├── ingredient.routes.ts
│   │   ├── tag.routes.ts
│   │   └── cookbook.routes.ts
│   ├── services/
│   │   ├── user.service.ts
│   │   ├── recipe.service.ts
│   │   ├── ingredient.service.ts
│   │   ├── tag.service.ts
│   │   └── cookbook.service.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── env.example
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.0+
- PostgreSQL 14+
- [Clerk](https://clerk.com) account

### Installation

```bash
# Clone the repository
git clone <your-repo>
cd smart-kitchen-api

# Install dependencies
bun install

# Configure environment
cp env.example .env
# Edit .env with your values

# Push schema to database
bun run db:push

# (Optional) Seed database
bun run db:seed

# Start development server
bun run dev
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `DATABASE_URL` | PostgreSQL connection URL | `postgresql://user:pass@localhost:5432/db` |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key | `pk_...` |
| `CLERK_SECRET_KEY` | Clerk secret key | `sk_...` |
| `CORS_ORIGIN` | CORS allowed origin | `*` |

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/sync` | Sync Clerk user into local DB (call after first sign-in) (🔒) |
| GET | `/api/v1/auth/me` | Get current user profile with recipes (🔒) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users` | List all users |
| GET | `/api/v1/users/:id` | Get user with recipes |
| PUT | `/api/v1/users/:id` | Update user (🔒) |
| DELETE | `/api/v1/users/:id` | Delete user (🔒) |

### Recipes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/recipes` | List recipes (search: `?q=`) |
| GET | `/api/v1/recipes/:id` | Get recipe with details |
| POST | `/api/v1/recipes` | Create recipe (🔒) |
| PUT | `/api/v1/recipes/:id` | Update recipe (🔒) |
| DELETE | `/api/v1/recipes/:id` | Delete recipe (🔒) |

### Recipe Steps
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/recipes/:id/steps` | Add step (🔒) |
| PUT | `/api/v1/recipes/:id/steps/:stepId` | Update step (🔒) |
| DELETE | `/api/v1/recipes/:id/steps/:stepId` | Delete step (🔒) |

### Recipe Ingredients
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/recipes/:id/ingredients` | Add ingredient (🔒) |
| PUT | `/api/v1/recipes/:id/ingredients/:ingredientId` | Update (🔒) |
| DELETE | `/api/v1/recipes/:id/ingredients/:ingredientId` | Remove (🔒) |

### Recipe Tags
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/recipes/:id/tags/:tagId` | Add tag (🔒) |
| DELETE | `/api/v1/recipes/:id/tags/:tagId` | Remove tag (🔒) |

### Ingredients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/ingredients` | List ingredients |
| GET | `/api/v1/ingredients/:id` | Get ingredient |
| GET | `/api/v1/ingredients/:id/recipes` | Recipes using ingredient |
| POST | `/api/v1/ingredients` | Create ingredient (🔒) |
| PUT | `/api/v1/ingredients/:id` | Update ingredient (🔒) |
| DELETE | `/api/v1/ingredients/:id` | Delete ingredient (🔒) |

### Tags
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tags` | List tags (`?category=`) |
| GET | `/api/v1/tags/grouped` | Tags grouped by category |
| GET | `/api/v1/tags/categories` | List all categories |
| GET | `/api/v1/tags/:id` | Get tag |
| GET | `/api/v1/tags/:id/recipes` | Recipes with tag |
| POST | `/api/v1/tags` | Create tag (🔒) |
| PUT | `/api/v1/tags/:id` | Update tag (🔒) |
| DELETE | `/api/v1/tags/:id` | Delete tag (🔒) |

### Cookbooks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/cookbooks` | My cookbooks (🔒) |
| GET | `/api/v1/cookbooks/:id` | Get cookbook (🔒) |
| POST | `/api/v1/cookbooks` | Create cookbook (🔒) |
| PUT | `/api/v1/cookbooks/:id` | Update cookbook (🔒) |
| DELETE | `/api/v1/cookbooks/:id` | Delete cookbook (🔒) |
| POST | `/api/v1/cookbooks/:id/recipes` | Add recipe to cookbook (🔒) |
| DELETE | `/api/v1/cookbooks/:id/recipes/:recipeId` | Remove recipe from cookbook (🔒) |

🔒 = Requires Clerk authentication (Bearer token)

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run start` | Start production server |
| `bun run build` | Build to `./dist` |
| `bun run db:generate` | Regenerate Prisma client |
| `bun run db:push` | Push schema to database |
| `bun run db:migrate` | Create and apply migration |
| `bun run db:migrate:prod` | Deploy migrations in production |
| `bun run db:seed` | Seed database with sample data |
| `bun run db:studio` | Open Prisma Studio |
| `bun run db:reset` | Reset database and re-run migrations |

## License

MIT
