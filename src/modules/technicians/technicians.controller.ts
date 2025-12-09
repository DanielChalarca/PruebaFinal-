import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TechniciansService } from './technicians.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@ApiTags('Técnicos')
@ApiBearerAuth()
@Controller('technicians')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Crear nuevo técnico (Solo Admin)' })
  @ApiResponse({ status: 201, description: 'Técnico creado exitosamente' })
  create(@Body() createTechnicianDto: CreateTechnicianDto) {
    return this.techniciansService.create(createTechnicianDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar todos los técnicos (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Lista de técnicos' })
  findAll() {
    return this.techniciansService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Obtener técnico por ID (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Técnico encontrado' })
  findOne(@Param('id') id: string) {
    return this.techniciansService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Actualizar técnico (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Técnico actualizado' })
  update(@Param('id') id: string, @Body() updateTechnicianDto: UpdateTechnicianDto) {
    return this.techniciansService.update(id, updateTechnicianDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar técnico (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Técnico eliminado' })
  remove(@Param('id') id: string) {
    return this.techniciansService.remove(id);
  }
}
