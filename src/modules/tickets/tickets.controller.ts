import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@ApiTags('Tickets')
@ApiBearerAuth()
@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.CLIENT)
  @ApiOperation({ summary: 'Crear nuevo ticket (Admin y Cliente)' })
  @ApiResponse({ status: 201, description: 'Ticket creado exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría o cliente no encontrado' })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar todos los tickets (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Lista de tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener ticket por ID' })
  @ApiParam({ name: 'id', description: 'ID del ticket' })
  @ApiResponse({ status: 200, description: 'Ticket encontrado' })
  @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Get('client/:id')
  @Roles(Role.ADMIN, Role.CLIENT)
  @ApiOperation({ summary: 'Obtener tickets por cliente (Admin y Cliente)' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  @ApiResponse({ status: 200, description: 'Lista de tickets del cliente' })
  findByClient(@Param('id') id: string) {
    return this.ticketsService.findByClient(id);
  }

  @Get('technician/:id')
  @Roles(Role.ADMIN, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Obtener tickets por técnico (Admin y Técnico)' })
  @ApiParam({ name: 'id', description: 'ID del técnico' })
  @ApiResponse({ status: 200, description: 'Lista de tickets del técnico' })
  findByTechnician(@Param('id') id: string) {
    return this.ticketsService.findByTechnician(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Actualizar ticket (Solo Admin)' })
  @ApiParam({ name: 'id', description: 'ID del ticket' })
  @ApiResponse({ status: 200, description: 'Ticket actualizado' })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Actualizar estado del ticket (Admin y Técnico)' })
  @ApiParam({ name: 'id', description: 'ID del ticket' })
  @ApiResponse({ status: 200, description: 'Estado actualizado' })
  @ApiResponse({ status: 400, description: 'Transición de estado inválida' })
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateTicketStatusDto) {
    return this.ticketsService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar ticket (Solo Admin)' })
  @ApiParam({ name: 'id', description: 'ID del ticket' })
  @ApiResponse({ status: 200, description: 'Ticket eliminado' })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
