import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

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
}
