import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';

@Entity('technicians')
export class Technician {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  specialty: string;

  @Column({ default: true })
  availability: boolean;

  @OneToOne(() => User, (user) => user.technician, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Ticket, (ticket) => ticket.technician)
  tickets: Ticket[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
