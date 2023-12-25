import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [ClientsModule, VehiclesModule, SchedulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
