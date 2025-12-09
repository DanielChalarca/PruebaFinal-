# 🗄️ Configuración de PostgreSQL

## Instalación de PostgreSQL

### En Ubuntu/Debian
```bash
# Actualizar repositorios
sudo apt update

# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Verificar instalación
psql --version
```

### En macOS
```bash
# Con Homebrew
brew install postgresql

# Iniciar servicio
brew services start postgresql

# Verificar instalación
psql --version
```

### En Windows
1. Descargar instalador desde: https://www.postgresql.org/download/windows/
2. Ejecutar instalador
3. Seguir el asistente (recordar la contraseña del usuario postgres)
4. Agregar PostgreSQL al PATH

---

## Configuración Inicial

### 1. Iniciar PostgreSQL

**Ubuntu/Debian:**
```bash
sudo service postgresql start
```

**macOS:**
```bash
brew services start postgresql
```

**Windows:**
PostgreSQL se inicia automáticamente como servicio

### 2. Acceder a PostgreSQL

```bash
# Como usuario postgres
sudo -u postgres psql

# O directamente (si tu usuario tiene permisos)
psql -U postgres
```

### 3. Crear Usuario (Opcional)

Si quieres usar un usuario diferente a `postgres`:

```sql
-- Crear usuario
CREATE USER techhelpdesk WITH PASSWORD 'tu_password';

-- Dar permisos
ALTER USER techhelpdesk CREATEDB;

-- Salir
\q
```

### 4. Crear Base de Datos

**Opción 1: Desde la terminal**
```bash
createdb techhelpdesk
```

**Opción 2: Desde psql**
```bash
psql -U postgres
```
```sql
CREATE DATABASE techhelpdesk;
\q
```

**Opción 3: Con usuario personalizado**
```bash
createdb -U techhelpdesk techhelpdesk
```

### 5. Verificar Base de Datos

```bash
psql -U postgres -l
```

Deberías ver `techhelpdesk` en la lista.

---

## Configuración del Proyecto

### 1. Archivo .env

El proyecto ya incluye un archivo `.env` con la configuración por defecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=techhelpdesk

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=24h
```

### 2. Ajustar Configuración

Si usas credenciales diferentes, edita el archivo `.env`:

```bash
# Abrir con tu editor favorito
nano .env
# o
code .env
```

Cambiar los valores según tu configuración:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
DB_DATABASE=techhelpdesk
```

---

## Verificar Conexión

### Probar Conexión Manualmente

```bash
psql -h localhost -U postgres -d techhelpdesk
```

Si conecta correctamente, verás:
```
psql (14.x)
Type "help" for help.

techhelpdesk=#
```

### Comandos Útiles en psql

```sql
-- Listar bases de datos
\l

-- Conectar a base de datos
\c techhelpdesk

-- Listar tablas
\dt

-- Ver estructura de tabla
\d nombre_tabla

-- Salir
\q
```

---

## Solución de Problemas

### Error: "role postgres does not exist"

**Solución:**
```bash
# Crear usuario postgres
sudo -u postgres createuser --superuser $USER
```

### Error: "could not connect to server"

**Solución:**
```bash
# Verificar si PostgreSQL está corriendo
sudo service postgresql status

# Iniciar PostgreSQL
sudo service postgresql start
```

### Error: "password authentication failed"

**Solución 1:** Verificar contraseña en `.env`

**Solución 2:** Cambiar contraseña del usuario
```bash
sudo -u postgres psql
```
```sql
ALTER USER postgres PASSWORD 'nueva_password';
\q
```

**Solución 3:** Configurar autenticación sin contraseña (solo desarrollo)
```bash
# Editar archivo de configuración
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Cambiar línea:
# local   all   postgres   peer
# Por:
# local   all   postgres   trust

# Reiniciar PostgreSQL
sudo service postgresql restart
```

### Error: "database techhelpdesk does not exist"

**Solución:**
```bash
createdb techhelpdesk
```

### Error: "port 5432 already in use"

**Solución:**
```bash
# Ver qué proceso usa el puerto
sudo lsof -i :5432

# Detener PostgreSQL
sudo service postgresql stop

# Iniciar de nuevo
sudo service postgresql start
```

---

## Comandos Útiles

### Gestión del Servicio

```bash
# Iniciar
sudo service postgresql start

# Detener
sudo service postgresql stop

# Reiniciar
sudo service postgresql restart

# Ver estado
sudo service postgresql status
```

### Backup y Restore

```bash
# Hacer backup
pg_dump -U postgres techhelpdesk > backup.sql

# Restaurar backup
psql -U postgres techhelpdesk < backup.sql
```

### Eliminar y Recrear Base de Datos

```bash
# Eliminar
dropdb techhelpdesk

# Crear de nuevo
createdb techhelpdesk
```

---

## Configuración para Producción

### 1. Cambiar Contraseña

```sql
ALTER USER postgres PASSWORD 'contraseña_segura_aqui';
```

### 2. Crear Usuario Específico

```sql
CREATE USER techhelpdesk_app WITH PASSWORD 'password_seguro';
GRANT ALL PRIVILEGES ON DATABASE techhelpdesk TO techhelpdesk_app;
```

### 3. Configurar Conexiones Remotas (si es necesario)

Editar `postgresql.conf`:
```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Cambiar:
```
listen_addresses = 'localhost'
```
Por:
```
listen_addresses = '*'
```

Editar `pg_hba.conf`:
```bash
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

Agregar:
```
host    all    all    0.0.0.0/0    md5
```

Reiniciar:
```bash
sudo service postgresql restart
```

### 4. Usar Migraciones en Producción

En producción, cambiar en `app.module.ts`:
```typescript
synchronize: false, // Cambiar de true a false
```

Y usar migraciones de TypeORM:
```bash
npm run typeorm migration:generate -- -n InitialMigration
npm run typeorm migration:run
```

---

## Verificación Final

### 1. Verificar PostgreSQL

```bash
# Ver versión
psql --version

# Ver estado
sudo service postgresql status

# Conectar
psql -U postgres -d techhelpdesk
```

### 2. Verificar Base de Datos

```sql
-- Conectar
\c techhelpdesk

-- Listar tablas (después de ejecutar la app)
\dt

-- Deberías ver:
-- users
-- categories
-- clients
-- technicians
-- tickets
```

### 3. Verificar Datos (después de seeders)

```sql
-- Ver usuarios
SELECT id, name, email, role FROM users;

-- Ver categorías
SELECT * FROM categories;

-- Ver clientes
SELECT * FROM clients;

-- Ver técnicos
SELECT * FROM technicians;
```

---

## Resumen de Pasos

```bash
# 1. Instalar PostgreSQL
sudo apt install postgresql

# 2. Iniciar servicio
sudo service postgresql start

# 3. Crear base de datos
createdb techhelpdesk

# 4. Verificar
psql -U postgres -l

# 5. Configurar .env (si es necesario)
nano .env

# 6. Ejecutar aplicación
npm run start:dev

# 7. Ejecutar seeders
npm run seed

# 8. Verificar en psql
psql -U postgres -d techhelpdesk
\dt
```

---

## Recursos Adicionales

- **Documentación oficial:** https://www.postgresql.org/docs/
- **Tutorial PostgreSQL:** https://www.postgresqltutorial.com/
- **TypeORM con PostgreSQL:** https://typeorm.io/

---

## Soporte

Si tienes problemas con PostgreSQL:

1. Verificar logs:
   ```bash
   sudo tail -f /var/log/postgresql/postgresql-14-main.log
   ```

2. Verificar configuración:
   ```bash
   psql -U postgres -c "SHOW config_file;"
   ```

3. Reiniciar servicio:
   ```bash
   sudo service postgresql restart
   ```

4. Verificar puerto:
   ```bash
   sudo netstat -plunt | grep postgres
   ```
