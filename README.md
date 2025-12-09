# TechHelpDesk API

**Developer:** Daniel Chalarca  
**Clan:** Nodejs/Tayrona

Technical support ticket management REST API built with NestJS, TypeORM, PostgreSQL, JWT and Swagger.

## Features

- JWT authentication with role-based access control
- Complete CRUD for users, categories, clients, technicians and tickets
- Ticket status workflow validation
- Technician workload control (max 5 tickets in progress)
- Automatic response formatting
- Complete API documentation with Swagger
- Database seeders with initial data
- Unit tests with Jest
- Docker deployment ready

## Requirements

### Option 1: Local Installation
- Node.js >= 16
- PostgreSQL >= 12
- npm or yarn

### Option 2: Docker (Recommended)
- Docker
- Docker Compose

## Installation

### With Docker (Recommended)

```bash
cd prueba-final

# Start all services
docker-compose up -d

# Wait 30 seconds and run seeders
docker-compose exec api npm run seed

# Access Swagger
# http://localhost:3000/api/docs
```

### Local Installation

```bash
cd prueba-final
npm install --legacy-peer-deps

# Create database
createdb techhelpdesk

# Start application
npm run start:dev

# Run seeders (in another terminal)
npm run seed

# Access Swagger
# http://localhost:3000/api/docs
```

## Environment Variables

Copy `.env.example` to `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=techhelpdesk

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=24h
```

## Test Users

After running seeders:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@techhelpdesk.com | password123 |
| Client 1 | carlos@example.com | password123 |
| Client 2 | laura@example.com | password123 |
| Technician 1 | maria@techhelpdesk.com | password123 |
| Technician 2 | pedro@techhelpdesk.com | password123 |

## API Documentation

Once the application is running:

**Swagger UI:** http://localhost:3000/api/docs

### Import to Postman

1. Open http://localhost:3000/api/docs-json in your browser
2. Copy all the JSON (Ctrl+A, Ctrl+C)
3. Open Postman and click "Import"
4. Select "Raw text" tab
5. Paste the JSON and click "Continue"
6. Click "Import"

## Main Endpoints

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login

### Tickets
- `POST /tickets` - Create ticket (Admin, Client)
- `GET /tickets` - List all (Admin)
- `GET /tickets/:id` - Get by ID
- `GET /tickets/client/:id` - Tickets by client
- `GET /tickets/technician/:id` - Tickets by technician
- `PATCH /tickets/:id/status` - Change status (Admin, Technician)
- `PATCH /tickets/:id` - Update ticket (Admin)
- `DELETE /tickets/:id` - Delete ticket (Admin)

### Categories
- `POST /categories` - Create (Admin)
- `GET /categories` - List all
- `GET /categories/:id` - Get by ID
- `PATCH /categories/:id` - Update (Admin)
- `DELETE /categories/:id` - Delete (Admin)

### Users (Admin only)
- `GET /users` - List
- `POST /users` - Create
- `GET /users/:id` - Get by ID
- `PATCH /users/:id` - Update
- `DELETE /users/:id` - Delete

### Clients (Admin only)
- Complete CRUD at `/clients`

### Technicians (Admin only)
- Complete CRUD at `/technicians`

## Ticket Status Flow

```
Open → In Progress → Resolved → Closed
```

Only sequential transitions are allowed.

## Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

## Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View containers
docker-compose ps

# Run seeders
docker-compose exec api npm run seed

# Run tests
docker-compose exec api npm run test:cov
```

## Project Structure

```
src/
├── common/
│   ├── decorators/      # @Roles, @CurrentUser
│   ├── enums/           # Role, TicketStatus, TicketPriority
│   ├── filters/         # HttpExceptionFilter
│   ├── guards/          # JwtAuthGuard, RolesGuard
│   └── interceptors/    # TransformInterceptor
├── database/
│   └── seeders/         # Initial data
├── entities/            # TypeORM entities
│   ├── user.entity.ts
│   ├── category.entity.ts
│   ├── client.entity.ts
│   ├── technician.entity.ts
│   └── ticket.entity.ts
├── modules/
│   ├── auth/            # JWT authentication
│   ├── users/           # User management
│   ├── categories/      # Category management
│   ├── clients/         # Client management
│   ├── technicians/     # Technician management
│   └── tickets/         # Ticket management
├── app.module.ts
└── main.ts
```

## Technologies

- NestJS - Backend framework
- TypeORM - ORM for PostgreSQL
- PostgreSQL - Database
- JWT - Authentication
- Passport - Authentication strategies
- Swagger - API documentation
- class-validator - DTO validation
- bcrypt - Password hashing
- Jest - Testing
- Docker - Containerization

## Available Scripts

```bash
npm run start          # Start in production mode
npm run start:dev      # Start in development mode
npm run start:debug    # Start in debug mode
npm run build          # Build project
npm run test           # Run tests
npm run test:cov       # Tests with coverage
npm run seed           # Populate database
npm run lint           # Run linter
npm run format         # Format code
```

## Database

The database dump is available in `database_dump.sql`. To restore:

```bash
# With Docker
docker-compose exec -T postgres psql -U postgres techhelpdesk < database_dump.sql

# Local
psql -U postgres -d techhelpdesk < database_dump.sql
```

## Notes

- The application uses `synchronize: true` for development
- In production, use TypeORM migrations
- Seeders should be run after starting the app
- JWT tokens expire in 24 hours (configurable)
