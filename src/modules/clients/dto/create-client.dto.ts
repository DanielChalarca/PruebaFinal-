import { IsNotEmpty, IsString, IsEmail, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Carlos Gómez', description: 'Nombre del cliente' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Tech Solutions', description: 'Empresa del cliente', required: false })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty({ example: 'carlos@techsolutions.com', description: 'Email de contacto' })
  @IsEmail()
  @IsNotEmpty()
  contactEmail: string;

  @ApiProperty({ example: 'uuid-del-usuario', description: 'ID del usuario asociado' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
