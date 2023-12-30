import { IsNumber, IsString, IsOptional } from 'class-validator';
export class CreateScheduleDto {
  @IsNumber()
  client_id: number;

  @IsNumber()
  vehicle_id: number;

  @IsString()
  date: string;

  /**
   * Balancer, align...
   */
  @IsString()
  service: string;

  /**
   * front tire only
   */
  @IsOptional()
  @IsString()
  detail: string | null;

  @IsNumber()
  value: string;
}
