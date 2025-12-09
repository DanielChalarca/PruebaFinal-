# 🚀 Guía Rápida - TechHelpDesk API

## Pasos para Ejecutar el Proyecto

### 1. Instalar Dependencias
```bash
npm install --legacy-peer-deps
```

### 2. Configurar Base de Datos

Crear la base de datos PostgreSQL:
```bash
createdb techhelpdesk
```

O desde psql:
```sql
CREATE DATABASE techhelpdesk;
```

### 3. Configurar Variables de Entorno

El archivo `.env` ya está configurado con valores por defecto:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=techhelpdesk
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=24h
```

### 4. Iniciar la Aplicación

```bash
npm run start:dev
```

La aplicación sincronizará automáticamente las tablas en la base de datos.

### 5. Poblar la Base de Datos

En otra terminal:
```bash
npm run seed
```

### 6. Acceder a la Documentación

Abrir en el navegador:
- **Swagger UI:** http://localhost:3000/api/docs

## 🧪 Ejecutar Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas con cobertura (mínimo 40%)
npm run test:cov
```

## 📋 Flujo de Prueba Completo

### 1. Registrar/Login

**POST** `/auth/login`
```json
{
  "email": "admin@techhelpdesk.com",
  "password": "password123"
}
```

Copiar el `token` de la respuesta.

### 2. Autorizar en Swagger

1. Clic en el botón "Authorize" (candado) en Swagger
2. Ingresar: `Bearer {token}`
3. Clic en "Authorize"

### 3. Crear un Ticket (como Cliente)

Login como cliente:
```json
{
  "email": "carlos@example.com",
  "password": "password123"
}
```

Obtener IDs necesarios:
- **GET** `/categories` - Copiar un `id` de categoría
- **GET** `/clients` - Copiar el `id` del cliente Carlos

**POST** `/tickets`
```json
{
  "title": "Problema con impresora",
  "description": "La impresora HP no responde al enviar documentos",
  "priority": "media",
  "categoryId": "{id-de-categoria}",
  "clientId": "{id-de-cliente}"
}
```

### 4. Asignar Técnico (como Admin)

Login como admin y obtener ID de técnico:
- **GET** `/technicians` - Copiar un `id` de técnico

**PATCH** `/tickets/{id-del-ticket}`
```json
{
  "technicianId": "{id-de-tecnico}"
}
```

### 5. Cambiar Estado (como Técnico)

Login como técnico:
```json
{
  "email": "maria@techhelpdesk.com",
  "password": "password123"
}
```

**PATCH** `/tickets/{id}/status`
```json
{
  "status": "en progreso"
}
```

### 6. Consultar Tickets

**Por Cliente:**
```
GET /tickets/client/{id-del-cliente}
```

**Por Técnico:**
```
GET /tickets/technician/{id-del-tecnico}
```

## 🎯 Validaciones Implementadas

### ✅ Secuencia de Estados
- Abierto → En progreso ✓
- En progreso → Resuelto ✓
- Resuelto → Cerrado ✓
- Abierto → Cerrado ✗ (rechazado)

### ✅ Límite de Tickets por Técnico
- Máximo 5 tickets "en progreso" simultáneos
- Al intentar asignar el 6to ticket, se rechaza

### ✅ Validación de Datos
- Email válido
- Contraseña mínimo 6 caracteres
- Categoría y cliente obligatorios en tickets
- Campos requeridos validados automáticamente

## 🔐 Roles y Accesos

| Endpoint | Admin | Técnico | Cliente |
|----------|-------|---------|---------|
| POST /tickets | ✓ | ✗ | ✓ |
| GET /tickets | ✓ | ✗ | ✗ |
| GET /tickets/:id | ✓ | ✓ | ✓ |
| PATCH /tickets/:id/status | ✓ | ✓ | ✗ |
| GET /tickets/client/:id | ✓ | ✗ | ✓ |
| GET /tickets/technician/:id | ✓ | ✓ | ✗ |
| CRUD /users | ✓ | ✗ | ✗ |
| CRUD /categories | ✓ | ✗ | ✗ |
| CRUD /clients | ✓ | ✗ | ✗ |
| CRUD /technicians | ✓ | ✗ | ✗ |

## 📊 Cobertura de Pruebas

Las pruebas unitarias cubren:
- ✅ Creación de tickets con validaciones
- ✅ Cambio de estado con secuencia válida
- ✅ Validación de categoría y cliente
- ✅ Transiciones de estado inválidas

Ejecutar para ver cobertura:
```bash
npm run test:cov
```

## 🐛 Solución de Problemas

### Error de conexión a PostgreSQL
```bash
# Verificar que PostgreSQL esté corriendo
sudo service postgresql status

# Iniciar PostgreSQL
sudo service postgresql start
```

### Error "database does not exist"
```bash
createdb techhelpdesk
```

### Error en seeders
```bash
# Asegurarse de que la aplicación haya corrido primero
npm run start:dev
# Esperar a que sincronice las tablas
# Luego ejecutar seeders
npm run seed
```

## 📞 Soporte

Para cualquier problema, revisar:
1. Logs de la aplicación en la terminal
2. Documentación en Swagger
3. README.md completo
