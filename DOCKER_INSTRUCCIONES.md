# 🐳 Despliegue con Docker

## 📋 Requisitos

- Docker instalado
- Docker Compose instalado

## 🚀 Ejecutar con Docker

### Opción 1: Levantar todo con un comando

```bash
docker-compose up -d
```

Esto levantará:
- ✅ Contenedor PostgreSQL (puerto 5432)
- ✅ Contenedor API NestJS (puerto 3000)
- ✅ Volumen persistente para la base de datos

### Opción 2: Construir y ejecutar paso a paso

```bash
# Construir la imagen
docker-compose build

# Levantar los contenedores
docker-compose up -d

# Ver logs
docker-compose logs -f
```

## 🔍 Verificar

```bash
# Ver contenedores corriendo
docker-compose ps

# Ver logs de la API
docker-compose logs -f api

# Ver logs de PostgreSQL
docker-compose logs -f postgres
```

## 📊 Acceder a la Aplicación

- **API:** http://localhost:3000
- **Swagger:** http://localhost:3000/api/docs
- **PostgreSQL:** localhost:5432

## 🌱 Ejecutar Seeders

```bash
# Entrar al contenedor de la API
docker-compose exec api sh

# Ejecutar seeders
npm run seed

# Salir
exit
```

## 🛑 Detener y Limpiar

```bash
# Detener contenedores
docker-compose down

# Detener y eliminar volúmenes (borra la base de datos)
docker-compose down -v

# Eliminar imágenes
docker-compose down --rmi all
```

## 🔧 Comandos Útiles

```bash
# Reiniciar servicios
docker-compose restart

# Ver logs en tiempo real
docker-compose logs -f

# Ejecutar comando en contenedor
docker-compose exec api npm run test

# Reconstruir imagen
docker-compose up -d --build
```

## 📝 Estructura

```
.
├── Dockerfile              # Imagen de la API
├── docker-compose.yml      # Orquestación de contenedores
├── .dockerignore          # Archivos excluidos
└── ...
```

## ⚙️ Configuración

Las variables de entorno están en `docker-compose.yml`:

```yaml
environment:
  DB_HOST: postgres
  DB_PORT: 5432
  DB_USERNAME: postgres
  DB_PASSWORD: postgres
  DB_DATABASE: techhelpdesk
  JWT_SECRET: your-secret-key-change-in-production
  JWT_EXPIRATION: 24h
```

## 🔐 Producción

Para producción, cambiar:

1. **Contraseñas seguras** en `docker-compose.yml`
2. **JWT_SECRET** único y seguro
3. Usar archivo `.env` en lugar de variables en compose
4. Configurar HTTPS con nginx/traefik

## 🎯 Flujo Completo

```bash
# 1. Levantar servicios
docker-compose up -d

# 2. Esperar a que la API esté lista (30 segundos aprox)
sleep 30

# 3. Ejecutar seeders
docker-compose exec api npm run seed

# 4. Acceder a Swagger
# http://localhost:3000/api/docs
```

## ✅ Verificación

```bash
# Verificar que los contenedores estén corriendo
docker-compose ps

# Debería mostrar:
# techhelpdesk-api    running    0.0.0.0:3000->3000/tcp
# techhelpdesk-db     running    0.0.0.0:5432->5432/tcp
```

## 🐛 Solución de Problemas

### Error: Puerto 3000 en uso

```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"  # Usar 3001 en lugar de 3000
```

### Error: Puerto 5432 en uso

```bash
# Detener PostgreSQL local
sudo service postgresql stop

# O cambiar puerto en docker-compose.yml
ports:
  - "5433:5432"
```

### Ver logs de errores

```bash
docker-compose logs api
docker-compose logs postgres
```

### Reiniciar desde cero

```bash
docker-compose down -v
docker-compose up -d --build
```
