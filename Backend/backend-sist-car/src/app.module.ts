import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SchedulesModule } from './schedules/schedules.module';
import { Client } from 'src/clients/entities/client.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Schedule } from './schedules/entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'scheduleCar',
      entities: [Client, Vehicle, Schedule],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Client, Vehicle, Schedule]),
    ClientsModule,
    VehiclesModule,
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
