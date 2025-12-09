import { IsNotEmpty, IsString, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TicketPriority } from '../../../common/enums/ticket-priority.enum';

export class CreateTicketDto {
  @ApiProperty({ example: 'Problema con impresora', description: 'Título del ticket' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'La impresora no responde al enviar documentos', description: 'Descripción detallada' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TicketPriority, example: TicketPriority.MEDIUM, description: 'Prioridad del ticket', required: false })
  @IsEnum(TicketPriority)
  @IsOptional()
  priority?: TicketPriority;

  @ApiProperty({ example: 'uuid-de-categoria', description: 'ID de la categoría' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: 'uuid-de-cliente', description: 'ID del cliente' })
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ example: 'uuid-de-tecnico', description: 'ID del técnico asignado', required: false })
  @IsUUID()
  @IsOptional()
  technicianId?: string;
}
