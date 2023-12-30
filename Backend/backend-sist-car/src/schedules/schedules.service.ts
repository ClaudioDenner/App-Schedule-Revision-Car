import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll() {
    try {
      const schedule = await this.scheduleRepository
        .createQueryBuilder('schedules')
        .leftJoinAndSelect('schedules.client_id', 'clients')
        .leftJoinAndSelect('schedules.vehicle_id', 'vehicles')
        .orderBy('schedules.id', 'DESC')
        .getMany();
      if (!schedule) {
        //return { fail: 'client not found' };
        throw new Error('Schedule not Found');
      }
      return schedule;
    } catch (error) {
      if (error == 'Error: Schedule not Found') {
        throw new HttpException('Schedule not Found', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.detail, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const schedule = await this.scheduleRepository
        .createQueryBuilder('schedules')
        .leftJoinAndSelect('schedules.client_id', 'clients')
        .leftJoinAndSelect('schedules.vehicle_id', 'vehicles')
        .where({ id })
        .getOne();
      if (!schedule) {
        //return { fail: 'client not found' };
        throw new Error('Schedule not Found');
      }
      return schedule;
    } catch (error) {
      if (error == 'Error: Schedule not Found') {
        throw new HttpException('Schedule not Found', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.detail, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createScheduleDto: CreateScheduleDto) {
    try {
      const schedule = this.scheduleRepository.create(createScheduleDto);
      await this.scheduleRepository.save([schedule]);
      return { success: 'Register Schedule with success!' };
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    try {
      const schedule = await this.scheduleRepository.update(
        id,
        updateScheduleDto,
      );
      return { Update: 'Success with the  update!', schedule };
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const schedule = await this.scheduleRepository.delete(id);
      return { message: 'client deleted with success', schedule };
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }
}
