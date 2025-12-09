import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ClientsModule } from './modules/clients/clients.module';
import { TechniciansModule } from './modules/technicians/technicians.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { User } from './entities/user.entity';
import { Category } from './entities/category.entity';
import { Client } from './entities/client.entity';
import { Technician } from './entities/technician.entity';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Category, Client, Technician, Ticket],
        synchronize: true, // Solo para desarrollo, en producción usar migraciones
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ClientsModule,
    TechniciansModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
