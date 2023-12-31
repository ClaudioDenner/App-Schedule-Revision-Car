import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
@Entity({
  name: 'schedules',
})
export class Schedule {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ManyToOne(() => Client, (client) => client.id)
  client_id: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
  vehicle_id: number;

  @Column({ length: 30 })
  date: string;

  @Column({ nullable: true })
  detail: string | null;

  @Column()
  service: string;

  @Column({ length: 70 })
  value: string;
}
