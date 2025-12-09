# 📡 Ejemplos de Requests - TechHelpDesk API

## 🔐 Autenticación

### Registrar Usuario
```http
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "name": "Nuevo Usuario",
  "email": "nuevo@example.com",
  "password": "password123",
  "role": "client"
}
```

### Login
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@techhelpdesk.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "Admin Principal",
      "email": "admin@techhelpdesk.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Operación exitosa"
}
```

---

## 👥 Usuarios (Solo Admin)

### Listar Usuarios
```http
GET http://localhost:3000/users
Authorization: Bearer {token}
```

### Crear Usuario
```http
POST http://localhost:3000/users
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Roberto Díaz",
  "email": "roberto@example.com",
  "password": "password123",
  "role": "technician"
}
```

### Actualizar Usuario
```http
PATCH http://localhost:3000/users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Roberto Díaz Actualizado"
}
```

### Eliminar Usuario
```http
DELETE http://localhost:3000/users/{id}
Authorization: Bearer {token}
```

---

## 📂 Categorías

### Listar Categorías
```http
GET http://localhost:3000/categories
Authorization: Bearer {token}
```

### Crear Categoría (Solo Admin)
```http
POST http://localhost:3000/categories
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Incidente de Red",
  "description": "Problemas relacionados con conectividad de red"
}
```

### Obtener Categoría por ID
```http
GET http://localhost:3000/categories/{id}
Authorization: Bearer {token}
```

### Actualizar Categoría (Solo Admin)
```http
PATCH http://localhost:3000/categories/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "description": "Descripción actualizada"
}
```

### Eliminar Categoría (Solo Admin)
```http
DELETE http://localhost:3000/categories/{id}
Authorization: Bearer {token}
```

---

## 👤 Clientes (Solo Admin)

### Listar Clientes
```http
GET http://localhost:3000/clients
Authorization: Bearer {token}
```

### Crear Cliente
```http
POST http://localhost:3000/clients
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Ana Rodríguez",
  "company": "Innovatech",
  "contactEmail": "ana@innovatech.com",
  "userId": "{id-del-usuario-con-rol-client}"
}
```

### Obtener Cliente por ID
```http
GET http://localhost:3000/clients/{id}
Authorization: Bearer {token}
```

### Actualizar Cliente
```http
PATCH http://localhost:3000/clients/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "company": "Innovatech Solutions"
}
```

### Eliminar Cliente
```http
DELETE http://localhost:3000/clients/{id}
Authorization: Bearer {token}
```

---

## 🔧 Técnicos (Solo Admin)

### Listar Técnicos
```http
GET http://localhost:3000/technicians
Authorization: Bearer {token}
```

### Crear Técnico
```http
POST http://localhost:3000/technicians
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Luis Fernández",
  "specialty": "Soporte de Hardware",
  "availability": true,
  "userId": "{id-del-usuario-con-rol-technician}"
}
```

### Obtener Técnico por ID
```http
GET http://localhost:3000/technicians/{id}
Authorization: Bearer {token}
```

### Actualizar Técnico
```http
PATCH http://localhost:3000/technicians/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "availability": false
}
```

### Eliminar Técnico
```http
DELETE http://localhost:3000/technicians/{id}
Authorization: Bearer {token}
```

---

## 🎫 Tickets

### Crear Ticket (Admin o Cliente)
```http
POST http://localhost:3000/tickets
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Problema con impresora HP",
  "description": "La impresora HP LaserJet no responde al enviar documentos desde Windows 10",
  "priority": "alta",
  "categoryId": "{id-de-categoria}",
  "clientId": "{id-de-cliente}",
  "technicianId": "{id-de-tecnico-opcional}"
}
```

**Prioridades válidas:** `"baja"`, `"media"`, `"alta"`, `"crítica"`

### Listar Todos los Tickets (Solo Admin)
```http
GET http://localhost:3000/tickets
Authorization: Bearer {token}
```

### Obtener Ticket por ID
```http
GET http://localhost:3000/tickets/{id}
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Problema con impresora HP",
    "description": "La impresora HP LaserJet no responde...",
    "status": "abierto",
    "priority": "alta",
    "categoryId": "uuid",
    "clientId": "uuid",
    "technicianId": "uuid",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "category": {
      "id": "uuid",
      "name": "Incidente de Hardware"
    },
    "client": {
      "id": "uuid",
      "name": "Carlos Gómez",
      "company": "Tech Solutions"
    },
    "technician": {
      "id": "uuid",
      "name": "María López",
      "specialty": "Redes y Conectividad"
    }
  },
  "message": "Operación exitosa"
}
```

### Obtener Tickets por Cliente (Admin o Cliente)
```http
GET http://localhost:3000/tickets/client/{id-del-cliente}
Authorization: Bearer {token}
```

### Obtener Tickets por Técnico (Admin o Técnico)
```http
GET http://localhost:3000/tickets/technician/{id-del-tecnico}
Authorization: Bearer {token}
```

### Actualizar Ticket (Solo Admin)
```http
PATCH http://localhost:3000/tickets/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Problema con impresora HP - Actualizado",
  "priority": "crítica",
  "technicianId": "{nuevo-id-de-tecnico}"
}
```

### Cambiar Estado del Ticket (Admin o Técnico)
```http
PATCH http://localhost:3000/tickets/{id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "en progreso"
}
```

**Estados válidos (en secuencia):**
1. `"abierto"` → `"en progreso"`
2. `"en progreso"` → `"resuelto"`
3. `"resuelto"` → `"cerrado"`

**Ejemplo de error (transición inválida):**
```json
{
  "success": false,
  "data": null,
  "message": "No se puede cambiar el estado de \"abierto\" a \"cerrado\". Secuencia válida: Abierto → En progreso → Resuelto → Cerrado"
}
```

### Eliminar Ticket (Solo Admin)
```http
DELETE http://localhost:3000/tickets/{id}
Authorization: Bearer {token}
```

---

## 🧪 Casos de Prueba

### Caso 1: Flujo Completo de Ticket

#### 1. Login como Cliente
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "carlos@example.com",
  "password": "password123"
}
```

#### 2. Obtener Categorías
```http
GET http://localhost:3000/categories
Authorization: Bearer {token-cliente}
```

#### 3. Obtener ID del Cliente
```http
GET http://localhost:3000/clients
Authorization: Bearer {token-admin}
```

#### 4. Crear Ticket
```http
POST http://localhost:3000/tickets
Authorization: Bearer {token-cliente}
Content-Type: application/json

{
  "title": "Monitor no enciende",
  "description": "El monitor Dell de la oficina 203 no enciende",
  "priority": "alta",
  "categoryId": "{id-categoria-hardware}",
  "clientId": "{id-cliente-carlos}"
}
```

#### 5. Login como Técnico
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "maria@techhelpdesk.com",
  "password": "password123"
}
```

#### 6. Ver Tickets Asignados
```http
GET http://localhost:3000/tickets/technician/{id-tecnico-maria}
Authorization: Bearer {token-tecnico}
```

#### 7. Cambiar Estado a "En Progreso"
```http
PATCH http://localhost:3000/tickets/{id-ticket}/status
Authorization: Bearer {token-tecnico}
Content-Type: application/json

{
  "status": "en progreso"
}
```

#### 8. Cambiar Estado a "Resuelto"
```http
PATCH http://localhost:3000/tickets/{id-ticket}/status
Authorization: Bearer {token-tecnico}
Content-Type: application/json

{
  "status": "resuelto"
}
```

#### 9. Login como Admin y Cerrar Ticket
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@techhelpdesk.com",
  "password": "password123"
}
```

```http
PATCH http://localhost:3000/tickets/{id-ticket}/status
Authorization: Bearer {token-admin}
Content-Type: application/json

{
  "status": "cerrado"
}
```

---

### Caso 2: Validación de Límite de Tickets

#### 1. Login como Admin
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@techhelpdesk.com",
  "password": "password123"
}
```

#### 2. Crear 5 Tickets Asignados al Mismo Técnico
Repetir 5 veces:
```http
POST http://localhost:3000/tickets
Authorization: Bearer {token-admin}
Content-Type: application/json

{
  "title": "Ticket de prueba {número}",
  "description": "Descripción del ticket",
  "priority": "media",
  "categoryId": "{id-categoria}",
  "clientId": "{id-cliente}",
  "technicianId": "{id-tecnico}"
}
```

#### 3. Cambiar Estado a "En Progreso" (5 veces)
```http
PATCH http://localhost:3000/tickets/{id-ticket}/status
Authorization: Bearer {token-admin}
Content-Type: application/json

{
  "status": "en progreso"
}
```

#### 4. Intentar Crear 6to Ticket (Debe Fallar)
```http
POST http://localhost:3000/tickets
Authorization: Bearer {token-admin}
Content-Type: application/json

{
  "title": "Ticket número 6",
  "description": "Este debe fallar",
  "priority": "media",
  "categoryId": "{id-categoria}",
  "clientId": "{id-cliente}",
  "technicianId": "{mismo-id-tecnico}"
}
```

**Respuesta esperada:**
```json
{
  "success": false,
  "data": null,
  "message": "El técnico ya tiene 5 tickets en progreso. No puede aceptar más tickets."
}
```

---

### Caso 3: Validación de Secuencia de Estados

#### Intentar Saltar Estados (Debe Fallar)
```http
PATCH http://localhost:3000/tickets/{id-ticket-abierto}/status
Authorization: Bearer {token-admin}
Content-Type: application/json

{
  "status": "cerrado"
}
```

**Respuesta esperada:**
```json
{
  "success": false,
  "data": null,
  "message": "No se puede cambiar el estado de \"abierto\" a \"cerrado\". Secuencia válida: Abierto → En progreso → Resuelto → Cerrado"
}
```

---

## 📝 Notas

- Todos los endpoints (excepto `/auth/register` y `/auth/login`) requieren autenticación
- El token debe incluirse en el header: `Authorization: Bearer {token}`
- Los IDs son UUIDs generados automáticamente
- Las fechas están en formato ISO 8601
- Todas las respuestas siguen el formato: `{ success, data, message }`

---

## 🔍 Swagger

Para una experiencia interactiva, usar Swagger UI:
**http://localhost:3000/api/docs**

Swagger permite:
- Ver todos los endpoints
- Probar requests directamente
- Ver ejemplos de request/response
- Autorizar con JWT fácilmente
