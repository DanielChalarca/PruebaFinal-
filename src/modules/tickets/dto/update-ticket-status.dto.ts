import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TicketStatus } from '../../../common/enums/ticket-status.enum';

export class UpdateTicketStatusDto {
  @ApiProperty({ enum: TicketStatus, example: TicketStatus.IN_PROGRESS, description: 'Nuevo estado del ticket' })
  @IsEnum(TicketStatus)
  @IsNotEmpty()
  status: TicketStatus;
}
