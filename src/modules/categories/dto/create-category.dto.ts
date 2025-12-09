import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Incidente de Hardware', description: 'Nombre de la categoría' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Problemas relacionados con hardware', description: 'Descripción de la categoría', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
