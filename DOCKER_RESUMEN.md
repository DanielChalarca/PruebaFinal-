# 🐳 Despliegue con Docker - Resumen

## ✅ Archivos Creados

- ✅ `Dockerfile` - Imagen de la API NestJS
- ✅ `docker-compose.yml` - Orquestación de contenedores
- ✅ `.dockerignore` - Exclusión de archivos
- ✅ `start-docker.sh` - Script de inicio rápido
- ✅ `DOCKER_INSTRUCCIONES.md` - Guía completa

## 🚀 Inicio Rápido

```bash
# Opción 1: Script automático
./start-docker.sh

# Opción 2: Manual
docker-compose up -d
docker-compose exec api npm run seed
```

## 📦 Contenedores

### 1. PostgreSQL
- **Imagen:** postgres:15-alpine
- **Puerto:** 5432
- **Volumen:** postgres_data (persistente)
- **Nombre:** techhelpdesk-db

### 2. API NestJS
- **Build:** Dockerfile
- **Puerto:** 3000
- **Nombre:** techhelpdesk-api
- **Depende de:** postgres

## 🔧 Comandos Útiles

```bash
# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Reiniciar
docker-compose restart

# Ver estado
docker-compose ps

# Ejecutar seeders
docker-compose exec api npm run seed

# Ejecutar tests
docker-compose exec api npm run test:cov
```

## 🌐 Acceso

- **API:** http://localhost:3000
- **Swagger:** http://localhost:3000/api/docs
- **PostgreSQL:** localhost:5432

## ✅ Requisito Cumplido

- ✅ Dockerfile para construir imagen de la API
- ✅ docker-compose.yml con contenedor de API
- ✅ docker-compose.yml con contenedor de PostgreSQL
- ✅ Volumen persistente para PostgreSQL
- ✅ Red bridge para comunicación entre contenedores
- ✅ Variables de entorno configuradas
- ✅ Script de inicio automático
