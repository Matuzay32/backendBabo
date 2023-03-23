import {
  IsBoolean,
  IsNotEmpty,
  isNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Imagen } from '../../image/entities/image.entity';
export class CreateAutoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;
  image: Imagen[];
}
