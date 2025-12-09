import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from '../../entities/ticket.entity';
import { Category } from '../../entities/category.entity';
import { Client } from '../../entities/client.entity';
import { Technician } from '../../entities/technician.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Category, Client, Technician])],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
