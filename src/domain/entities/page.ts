import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
import { testimony } from './testimony';

// tslint:disable-next-line: max-classes-per-file
export class Page {
  // tslint:disable-next-line: variable-name
  readonly _id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  biografy: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  testimonies: testimony[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  phoneNumber: boolean;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: Date;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  log: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  video: string;

}

