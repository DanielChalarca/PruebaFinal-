import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, nullable: true })
  company: string;

  @Column({ length: 100 })
  contactEmail: string;

  @OneToOne(() => User, (user) => user.client, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Ticket, (ticket) => ticket.client)
  tickets: Ticket[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
