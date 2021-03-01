import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';
// tslint:disable-next-line: max-classes-per-file
export class testimony {
  // tslint:disable-next-line: variable-name
  readonly _id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cargo: string;

}

