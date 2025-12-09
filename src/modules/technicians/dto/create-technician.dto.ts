import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnicianDto {
  @ApiProperty({ example: 'María López', description: 'Nombre del técnico' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Redes y Conectividad', description: 'Especialidad del técnico' })
  @IsString()
  @IsNotEmpty()
  specialty: string;

  @ApiProperty({ example: true, description: 'Disponibilidad del técnico', required: false })
  @IsBoolean()
  @IsOptional()
  availability?: boolean;

  @ApiProperty({ example: 'uuid-del-usuario', description: 'ID del usuario asociado' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
