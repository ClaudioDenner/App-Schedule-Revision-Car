import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
//
@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async findAll() {
    try {
      const vehicles = await this.vehicleRepository
        .createQueryBuilder('vehicles')
        .leftJoinAndSelect('vehicles.client_id', 'clients')
        .orderBy('vehicles.id', 'DESC')
        .getMany();
      if (!vehicles) {
        //return { fail: 'client not found' };
        throw new Error('Clients not Found');
      }
      return vehicles;
    } catch (error) {
      if (error == 'Error: Clients not Found') {
        throw new HttpException('Clients not Found', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.detail, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const vehicles = await this.vehicleRepository
        .createQueryBuilder('vehicles')
        .leftJoinAndSelect('vehicles.client_id', 'clients')
        .where({ id })
        .getOne();
      if (!vehicles) {
        //return { fail: 'client not found' };
        throw new Error('Clients not Found');
      }
      return vehicles;
    } catch (error) {
      if (error == 'Error: Clients not Found') {
        throw new HttpException('Clients not Found', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.detail, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      const client = this.vehicleRepository.create(createVehicleDto);
      await this.vehicleRepository.save([client]);
      return { success: 'Register Insert with success!' };
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    try {
      const vehicle = await this.vehicleRepository.update(id, updateVehicleDto);
      return { Update: 'Success with the  update!' };
      return vehicle;
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const vehicle = await this.vehicleRepository.delete(id);
      return { message: 'client deleted with success', vehicle };
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }
}
