import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';

@Entity({
  name: 'clients',
})
export class Client {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 70 })
  name_complete: string;

  @Column({ length: 11 })
  @Index({ unique: true })
  cpf: string;

  @Column({ length: 15 })
  @Index({ unique: true })
  phone: string;

  @Column({ length: 70 })
  @Index({ unique: true })
  email: string;

  @Column()
  gender: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.client_id, { cascade: true })
  vehicles: Vehicle[];

  @OneToMany(() => Schedule, (schedules) => schedules.client_id, {
    cascade: true,
  })
  schedules: Schedule[];
}
