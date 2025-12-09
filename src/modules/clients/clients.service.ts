import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../entities/client.entity';
import { User } from '../../entities/user.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const user = await this.userRepository.findOne({
      where: { id: createClientDto.userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.role !== Role.CLIENT) {
      throw new BadRequestException('El usuario debe tener rol de cliente');
    }

    const client = this.clientRepository.create({
      ...createClientDto,
      user,
    });

    return this.clientRepository.save(client);
  }

  async findAll() {
    return this.clientRepository.find({ relations: ['user'] });
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);
    Object.assign(client, updateClientDto);
    return this.clientRepository.save(client);
  }

  async remove(id: string) {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
    return { message: 'Cliente eliminado exitosamente' };
  }
}
