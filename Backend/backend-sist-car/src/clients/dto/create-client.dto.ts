import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('/clients')
export class CreateClientDto {
  @ApiProperty({
    description: 'Name complete with even 80 charset',
    example: 'Claudio Denner',
  })
  @IsString()
  name_complete: string;
  /**
   * 06000000000 (11digts)
   */
  @ApiProperty()
  @IsString()
  cpf: string;
  /**
   * 557198177-7777
   */
  @ApiProperty()
  @IsString()
  phone: string;

  /**
   * test@test.com.br
   */
  @IsEmail()
  email: string;
  /**
   * masculine or feminine
   */
  @ApiProperty()
  @IsString()
  gender: string;
}
