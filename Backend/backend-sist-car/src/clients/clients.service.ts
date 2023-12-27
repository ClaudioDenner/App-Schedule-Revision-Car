import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = this.clientRepository.create(createClientDto);
      await this.clientRepository.save([client]);
      return { success: 'Register Insert with success!' };
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const client = await this.clientRepository.find({
        order: { id: 'DESC' },
      });
      if (!client) {
        //return { fail: 'client not found' };
        throw new Error('Clients not Found');
      }
      return client;
    } catch (error) {
      if (error == 'Error: Clients not Found') {
        throw new HttpException('Clients not Found', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.detail, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const client = await this.clientRepository.findOneBy({
        id,
      });
      if (!client) {
        //return { fail: 'client not found' };
        throw new Error('Client not Found');
      }
      return client;
    } catch (error) {
      if (error == 'Error: Client not Found') {
        throw new HttpException('Client not Found', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.detail, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.clientRepository.update(id, updateClientDto);
      return { Update: 'Success with the  update!' };
      return client;
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const client = await this.clientRepository.delete(id);
      return { message: 'client deleted with success' };
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }
}
