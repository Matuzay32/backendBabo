import { PartialType } from '@nestjs/swagger';
import { CreateAutoDto } from './create-auto.dto';

export class UpdateAutoDto extends PartialType(CreateAutoDto) {}
