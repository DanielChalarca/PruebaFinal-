import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Configurar ValidationPipe global para validar DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('TechHelpDesk API')
    .setDescription('API REST para gestión de tickets de soporte técnico')
    .setVersion('1.0')
    .addTag('Autenticación', 'Endpoints de registro y login')
    .addTag('Usuarios', 'Gestión de usuarios (Solo Admin)')
    .addTag('Categorías', 'Gestión de categorías de incidencias')
    .addTag('Clientes', 'Gestión de clientes')
    .addTag('Técnicos', 'Gestión de técnicos')
    .addTag('Tickets', 'Gestión de tickets de soporte')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Aplicación corriendo en: http://localhost:${port}`);
  console.log(`📚 Documentación Swagger: http://localhost:${port}/api/docs`);
}

bootstrap();
