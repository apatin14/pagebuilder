import { testimony } from '@domain/entities/testimony';
import {IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class PageDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  biografy: string;

  @IsString()
  @IsNotEmpty()
  testimonies: testimony[];

  @IsNumber()
  @IsNotEmpty()
  phoneNumber: boolean;


  @IsEmail()
  @IsNotEmpty()
  email: Date;

  @IsUrl()
  @IsNotEmpty()
  log: string;

  @IsUrl()
  @IsNotEmpty()
  video: string;

}

