import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';

@Entity({
  name: 'vehicles',
})
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.id)
  client_id: number;

  @Column({ length: 20 })
  model: string;

  @Column({ length: 4 })
  year: string;

  @Column({ length: 10 })
  @Index({ unique: true })
  plate: string;
}
