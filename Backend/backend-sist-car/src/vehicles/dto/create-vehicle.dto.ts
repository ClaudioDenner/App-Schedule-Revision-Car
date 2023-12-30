import { IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsNumber()
  client_id: number;
  /**
   * Ex: Ferrari
   */
  @IsString()
  model: string;

  /**
   * Ex: 2015
   */
  @IsNumber()
  year: string;

  /**
   * Ex: XYZ-1234
   */
  @IsString()
  plate: string;
}
