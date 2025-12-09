# TechHelpDesk API

API REST para gestión de tickets de soporte técnico construida con NestJS, TypeORM, PostgreSQL, JWT y Swagger.

## 🚀 Características

- ✅ Autenticación JWT con roles (Admin, Técnico, Cliente)
- ✅ CRUD completo de usuarios, categorías, clientes, técnicos y tickets
- ✅ Control de acceso basado en roles con Guards personalizados
- ✅ Validación de secuencia de estados de tickets
- ✅ Límite de 5 tickets "en progreso" por técnico
- ✅ Documentación automática con Swagger
- ✅ Interceptores para formatear respuestas
- ✅ Filtros de excepciones personalizados
- ✅ Seeders para datos iniciales
- ✅ Pruebas unitarias con Jest

## 📋 Requisitos

- Node.js >= 16
- PostgreSQL >= 12
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio e instalar dependencias:**

```bash
cd prueba-final
npm install
```

2. **Configurar variables de entorno:**

Copiar `.env.example` a `.env` y configurar:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=techhelpdesk

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=24h
```

3. **Crear la base de datos:**

```bash
createdb techhelpdesk
```

O desde PostgreSQL:
```sql
CREATE DATABASE techhelpdesk;
```

4. **Ejecutar la aplicación (sincroniza tablas automáticamente):**

```bash
npm run start:dev
```

5. **Poblar la base de datos con datos iniciales:**

```bash
npm run seed
```

## 👥 Usuarios de Prueba

Después de ejecutar los seeders:

| Rol | Email | Password |
|-----|-------|----------|
| Admin | admin@techhelpdesk.com | password123 |
| Cliente 1 | carlos@example.com | password123 |
| Cliente 2 | laura@example.com | password123 |
| Técnico 1 | maria@techhelpdesk.com | password123 |
| Técnico 2 | pedro@techhelpdesk.com | password123 |

## 📚 Documentación API

Una vez iniciada la aplicación, acceder a:

**Swagger UI:** http://localhost:3000/api/docs

## 🧪 Pruebas

```bash
# Ejecutar pruebas unitarias
npm run test

# Ejecutar pruebas con cobertura
npm run test:cov

# Ejecutar pruebas en modo watch
npm run test:watch
```

## 🏗️ Arquitectura

### Estructura del Proyecto

```
src/
├── common/
│   ├── decorators/      # @Roles, @CurrentUser
│   ├── enums/           # Role, TicketStatus, TicketPriority
│   ├── filters/         # HttpExceptionFilter
│   ├── guards/          # JwtAuthGuard, RolesGuard
│   └── interceptors/    # TransformInterceptor
├── database/
│   └── seeders/         # Datos iniciales
├── entities/            # Entidades TypeORM
│   ├── user.entity.ts
│   ├── category.entity.ts
│   ├── client.entity.ts
│   ├── technician.entity.ts
│   └── ticket.entity.ts
├── modules/
│   ├── auth/            # Autenticación JWT
│   ├── users/           # Gestión de usuarios
│   ├── categories/      # Gestión de categorías
│   ├── clients/         # Gestión de clientes
│   ├── technicians/     # Gestión de técnicos
│   └── tickets/         # Gestión de tickets
├── app.module.ts
└── main.ts
```

### Principios SOLID Aplicados

- **Single Responsibility:** Cada servicio tiene una única responsabilidad
- **Open/Closed:** Uso de decoradores y guards extensibles
- **Liskov Substitution:** Interfaces y abstracciones consistentes
- **Interface Segregation:** DTOs específicos para cada operación
- **Dependency Inversion:** Inyección de dependencias en todos los módulos

## 🔐 Roles y Permisos

### Administrador
- CRUD completo de usuarios, categorías, clientes, técnicos y tickets
- Acceso a todos los endpoints

### Técnico
- Consultar tickets asignados
- Actualizar estado de tickets asignados
- Máximo 5 tickets "en progreso" simultáneos

### Cliente
- Crear nuevos tickets
- Consultar su historial de tickets

## 🎯 Endpoints Principales

### Autenticación
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión

### Tickets
- `POST /tickets` - Crear ticket (Admin, Cliente)
- `GET /tickets` - Listar todos (Admin)
- `GET /tickets/:id` - Obtener por ID
- `GET /tickets/client/:id` - Tickets por cliente
- `GET /tickets/technician/:id` - Tickets por técnico
- `PATCH /tickets/:id/status` - Cambiar estado (Admin, Técnico)
- `PATCH /tickets/:id` - Actualizar ticket (Admin)
- `DELETE /tickets/:id` - Eliminar ticket (Admin)

### Categorías
- `POST /categories` - Crear (Admin)
- `GET /categories` - Listar todas
- `GET /categories/:id` - Obtener por ID
- `PATCH /categories/:id` - Actualizar (Admin)
- `DELETE /categories/:id` - Eliminar (Admin)

## 🔄 Flujo de Estados de Tickets

```
Abierto → En progreso → Resuelto → Cerrado
```

Solo se permiten transiciones secuenciales. Cualquier intento de saltar estados será rechazado.

## 🛠️ Tecnologías

- **NestJS** - Framework backend
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Passport** - Estrategias de autenticación
- **Swagger** - Documentación API
- **class-validator** - Validación de DTOs
- **bcrypt** - Hash de contraseñas
- **Jest** - Testing

## 📝 Scripts Disponibles

```bash
npm run start          # Iniciar en modo producción
npm run start:dev      # Iniciar en modo desarrollo
npm run start:debug    # Iniciar en modo debug
npm run build          # Compilar proyecto
npm run test           # Ejecutar pruebas
npm run test:cov       # Pruebas con cobertura
npm run seed           # Poblar base de datos
npm run lint           # Ejecutar linter
npm run format         # Formatear código
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto es privado y no tiene licencia pública.

## 👨‍💻 Autor

Desarrollado como prueba técnica para TechHelpDesk
