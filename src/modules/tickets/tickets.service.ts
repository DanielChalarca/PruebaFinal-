import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../../entities/ticket.entity';
import { Category } from '../../entities/category.entity';
import { Client } from '../../entities/client.entity';
import { Technician } from '../../entities/technician.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { TicketStatus } from '../../common/enums/ticket-status.enum';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Technician)
    private technicianRepository: Repository<Technician>,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createTicketDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const client = await this.clientRepository.findOne({
      where: { id: createTicketDto.clientId },
    });
    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    let technician = null;
    if (createTicketDto.technicianId) {
      technician = await this.technicianRepository.findOne({
        where: { id: createTicketDto.technicianId },
      });
      if (!technician) {
        throw new NotFoundException('Técnico no encontrado');
      }

      await this.validateTechnicianWorkload(createTicketDto.technicianId);
    }

    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      category,
      client,
      technician,
    });

    return this.ticketRepository.save(ticket);
  }

  async findAll() {
    return this.ticketRepository.find({
      relations: ['category', 'client', 'technician'],
    });
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['category', 'client', 'technician'],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket no encontrado');
    }

    return ticket;
  }

  async findByClient(clientId: string) {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
    });
    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return this.ticketRepository.find({
      where: { clientId },
      relations: ['category', 'client', 'technician'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByTechnician(technicianId: string) {
    const technician = await this.technicianRepository.findOne({
      where: { id: technicianId },
    });
    if (!technician) {
      throw new NotFoundException('Técnico no encontrado');
    }

    return this.ticketRepository.find({
      where: { technicianId },
      relations: ['category', 'client', 'technician'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.findOne(id);

    if (updateTicketDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateTicketDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Categoría no encontrada');
      }
    }

    if (updateTicketDto.technicianId) {
      const technician = await this.technicianRepository.findOne({
        where: { id: updateTicketDto.technicianId },
      });
      if (!technician) {
        throw new NotFoundException('Técnico no encontrado');
      }

      if (ticket.technicianId !== updateTicketDto.technicianId) {
        await this.validateTechnicianWorkload(updateTicketDto.technicianId);
      }
    }

    Object.assign(ticket, updateTicketDto);
    return this.ticketRepository.save(ticket);
  }

  async updateStatus(id: string, updateStatusDto: UpdateTicketStatusDto) {
    const ticket = await this.findOne(id);
    const newStatus = updateStatusDto.status;

    this.validateStatusTransition(ticket.status, newStatus);

    ticket.status = newStatus;
    return this.ticketRepository.save(ticket);
  }

  async remove(id: string) {
    const ticket = await this.findOne(id);
    await this.ticketRepository.remove(ticket);
    return { message: 'Ticket eliminado exitosamente' };
  }

  private validateStatusTransition(currentStatus: TicketStatus, newStatus: TicketStatus) {
    const validTransitions = {
      [TicketStatus.OPEN]: [TicketStatus.IN_PROGRESS],
      [TicketStatus.IN_PROGRESS]: [TicketStatus.RESOLVED],
      [TicketStatus.RESOLVED]: [TicketStatus.CLOSED],
      [TicketStatus.CLOSED]: [],
    };

    if (!validTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(
        `No se puede cambiar el estado de "${currentStatus}" a "${newStatus}". Secuencia válida: Abierto → En progreso → Resuelto → Cerrado`,
      );
    }
  }

  private async validateTechnicianWorkload(technicianId: string) {
    const inProgressCount = await this.ticketRepository.count({
      where: {
        technicianId,
        status: TicketStatus.IN_PROGRESS,
      },
    });

    if (inProgressCount >= 5) {
      throw new BadRequestException(
        'El técnico ya tiene 5 tickets en progreso. No puede aceptar más tickets.',
      );
    }
  }
}
