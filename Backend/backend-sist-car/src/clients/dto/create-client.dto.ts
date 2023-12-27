import { IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name_complete: string;

  @IsString()
  cpf: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  gender: string;
}
