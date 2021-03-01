import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';


export class testimonyDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  cargo: string;

}

