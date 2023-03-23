import {
  IsBoolean,
  IsNotEmpty,
  isNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Auto } from '../../auto/entities/auto.entity';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;
  auto: Auto;
}
