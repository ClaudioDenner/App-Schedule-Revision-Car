import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Name complete with even 80 charset',
    example: 'Claudio Denner',
  })
  @IsString()
  name_complete: string;

  @ApiProperty()
  @IsString()
  cpf: string;

  @ApiProperty()
  @IsString()
  phone: string;

  /**
   * List of modules to include in the specification
   */
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  gender: string;
}
