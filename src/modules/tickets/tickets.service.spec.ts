import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketsService } from './tickets.service';
import { Ticket } from '../../entities/ticket.entity';
import { Category } from '../../entities/category.entity';
import { Client } from '../../entities/client.entity';
import { Technician } from '../../entities/technician.entity';
import { TicketStatus } from '../../common/enums/ticket-status.enum';
import { TicketPriority } from '../../common/enums/ticket-priority.enum';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('TicketsService', () => {
  let service: TicketsService;
  let ticketRepository: Repository<Ticket>;
  let categoryRepository: Repository<Category>;
  let clientRepository: Repository<Client>;
  let technicianRepository: Repository<Technician>;

  const mockTicketRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    count: jest.fn(),
    remove: jest.fn(),
  };

  const mockCategoryRepository = {
    findOne: jest.fn(),
  };

  const mockClientRepository = {
    findOne: jest.fn(),
  };

  const mockTechnicianRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        {
          provide: getRepositoryToken(Ticket),
          useValue: mockTicketRepository,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
        {
          provide: getRepositoryToken(Client),
          useValue: mockClientRepository,
        },
        {
          provide: getRepositoryToken(Technician),
          useValue: mockTechnicianRepository,
        },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
    ticketRepository = module.get<Repository<Ticket>>(getRepositoryToken(Ticket));
    categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
    clientRepository = module.get<Repository<Client>>(getRepositoryToken(Client));
    technicianRepository = module.get<Repository<Technician>>(getRepositoryToken(Technician));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debe crear un ticket exitosamente', async () => {
      const createTicketDto = {
        title: 'Problema con impresora',
        description: 'La impresora no responde',
        priority: TicketPriority.MEDIUM,
        categoryId: 'category-uuid',
        clientId: 'client-uuid',
      };

      const mockCategory = { id: 'category-uuid', name: 'Hardware' };
      const mockClient = { id: 'client-uuid', name: 'Carlos' };
      const mockTicket = {
        id: 'ticket-uuid',
        ...createTicketDto,
        status: TicketStatus.OPEN,
        category: mockCategory,
        client: mockClient,
      };

      mockCategoryRepository.findOne.mockResolvedValue(mockCategory);
      mockClientRepository.findOne.mockResolvedValue(mockClient);
      mockTicketRepository.create.mockReturnValue(mockTicket);
      mockTicketRepository.save.mockResolvedValue(mockTicket);

      const result = await service.create(createTicketDto);

      expect(result).toEqual(mockTicket);
      expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
        where: { id: createTicketDto.categoryId },
      });
      expect(mockClientRepository.findOne).toHaveBeenCalledWith({
        where: { id: createTicketDto.clientId },
      });
      expect(mockTicketRepository.save).toHaveBeenCalled();
    });

    it('debe lanzar NotFoundException si la categoría no existe', async () => {
      const createTicketDto = {
        title: 'Test',
        description: 'Test',
        priority: TicketPriority.MEDIUM,
        categoryId: 'invalid-uuid',
        clientId: 'client-uuid',
      };

      mockCategoryRepository.findOne.mockResolvedValue(null);

      await expect(service.create(createTicketDto)).rejects.toThrow(NotFoundException);
      await expect(service.create(createTicketDto)).rejects.toThrow('Categoría no encontrada');
    });

    it('debe lanzar NotFoundException si el cliente no existe', async () => {
      const createTicketDto = {
        title: 'Test',
        description: 'Test',
        priority: TicketPriority.MEDIUM,
        categoryId: 'category-uuid',
        clientId: 'invalid-uuid',
      };

      const mockCategory = { id: 'category-uuid', name: 'Hardware' };
      mockCategoryRepository.findOne.mockResolvedValue(mockCategory);
      mockClientRepository.findOne.mockResolvedValue(null);

      await expect(service.create(createTicketDto)).rejects.toThrow(NotFoundException);
      await expect(service.create(createTicketDto)).rejects.toThrow('Cliente no encontrado');
    });
  });

  describe('updateStatus', () => {
    it('debe actualizar el estado del ticket correctamente', async () => {
      const ticketId = 'ticket-uuid';
      const mockTicket = {
        id: ticketId,
        title: 'Test',
        status: TicketStatus.OPEN,
      };

      const updateStatusDto = { status: TicketStatus.IN_PROGRESS };

      mockTicketRepository.findOne.mockResolvedValue(mockTicket);
      mockTicketRepository.save.mockResolvedValue({
        ...mockTicket,
        status: TicketStatus.IN_PROGRESS,
      });

      const result = await service.updateStatus(ticketId, updateStatusDto);

      expect(result.status).toBe(TicketStatus.IN_PROGRESS);
      expect(mockTicketRepository.save).toHaveBeenCalled();
    });

    it('debe lanzar BadRequestException si la transición de estado es inválida', async () => {
      const ticketId = 'ticket-uuid';
      const mockTicket = {
        id: ticketId,
        title: 'Test',
        status: TicketStatus.OPEN,
      };

      const updateStatusDto = { status: TicketStatus.CLOSED };

      mockTicketRepository.findOne.mockResolvedValue(mockTicket);

      await expect(service.updateStatus(ticketId, updateStatusDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('debe permitir la transición de OPEN a IN_PROGRESS', async () => {
      const ticketId = 'ticket-uuid';
      const mockTicket = {
        id: ticketId,
        status: TicketStatus.OPEN,
      };

      mockTicketRepository.findOne.mockResolvedValue(mockTicket);
      mockTicketRepository.save.mockResolvedValue({
        ...mockTicket,
        status: TicketStatus.IN_PROGRESS,
      });

      const result = await service.updateStatus(ticketId, { status: TicketStatus.IN_PROGRESS });

      expect(result.status).toBe(TicketStatus.IN_PROGRESS);
    });

    it('debe permitir la transición de IN_PROGRESS a RESOLVED', async () => {
      const ticketId = 'ticket-uuid';
      const mockTicket = {
        id: ticketId,
        status: TicketStatus.IN_PROGRESS,
      };

      mockTicketRepository.findOne.mockResolvedValue(mockTicket);
      mockTicketRepository.save.mockResolvedValue({
        ...mockTicket,
        status: TicketStatus.RESOLVED,
      });

      const result = await service.updateStatus(ticketId, { status: TicketStatus.RESOLVED });

      expect(result.status).toBe(TicketStatus.RESOLVED);
    });
  });
});
