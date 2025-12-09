#!/bin/bash

echo "🐳 Iniciando TechHelpDesk con Docker..."
echo ""

# Levantar servicios
echo "📦 Levantando contenedores..."
docker-compose up -d

# Esperar a que la API esté lista
echo "⏳ Esperando a que la API esté lista (30 segundos)..."
sleep 30

# Ejecutar seeders
echo "🌱 Ejecutando seeders..."
docker-compose exec -T api npm run seed

echo ""
echo "✅ ¡Listo!"
echo ""
echo "📚 Swagger: http://localhost:3000/api/docs"
echo "🔌 API: http://localhost:3000"
echo ""
echo "Ver logs: docker-compose logs -f"
echo "Detener: docker-compose down"
