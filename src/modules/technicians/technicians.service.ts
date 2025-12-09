import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from '../../entities/technician.entity';
import { User } from '../../entities/user.entity';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(Technician)
    private technicianRepository: Repository<Technician>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTechnicianDto: CreateTechnicianDto) {
    const user = await this.userRepository.findOne({
      where: { id: createTechnicianDto.userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.role !== Role.TECHNICIAN) {
      throw new BadRequestException('El usuario debe tener rol de técnico');
    }

    const technician = this.technicianRepository.create({
      ...createTechnicianDto,
      user,
    });

    return this.technicianRepository.save(technician);
  }

  async findAll() {
    return this.technicianRepository.find({ relations: ['user'] });
  }

  async findOne(id: string) {
    const technician = await this.technicianRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!technician) {
      throw new NotFoundException('Técnico no encontrado');
    }

    return technician;
  }

  async update(id: string, updateTechnicianDto: UpdateTechnicianDto) {
    const technician = await this.findOne(id);
    Object.assign(technician, updateTechnicianDto);
    return this.technicianRepository.save(technician);
  }

  async remove(id: string) {
    const technician = await this.findOne(id);
    await this.technicianRepository.remove(technician);
    return { message: 'Técnico eliminado exitosamente' };
  }
}
