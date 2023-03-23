import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAutoDto } from './dto/create-auto.dto';
import { UpdateAutoDto } from './dto/update-auto.dto';
import { Auto } from './entities/auto.entity';

@Injectable()
export class AutoService {
  constructor(
    @InjectRepository(Auto) private repositoryAuto: Repository<Auto>,
  ) {}

  async create(createAutoDto: CreateAutoDto): Promise<any> {
    const { name, description } = createAutoDto;

    try {
      const found = await this.repositoryAuto.findOne({
        where: {
          name: name,
          description: description,
        },
      });
      if (found) {
        return {
          message: `El auto ${name} ya se encuentra en la DB`,
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          data: found,
        };
      }

      await this.repositoryAuto.save(createAutoDto);
      return {
        message: `El auto ${name} fue creado exitosamente`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar crear el auto con # ${name}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll(): Promise<any[] | any> {
    try {
      const found = await this.repositoryAuto
        .createQueryBuilder('auto')
        .leftJoinAndSelect('auto.image', 'image')
        .select([
          'auto.id as auto_id',
          'auto.name as auto_name',
          'auto.description as auto_description',
          'auto.year as auto_year',
          `string_agg(image.url, ',') as image_url`,
        ])
        .groupBy('auto.id')
        .getRawMany();

      if (found) {
        return found.map((item) => {
          return {
            auto_id: item.auto_id,
            auto_name: item.auto_name,
            auto_description: item.auto_description,
            auto_year: item.auto_year,
            image_url: item.image_url.split(','),
          };
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar encontrar los autos `,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auto`;
  }

  update(id: number, updateAutoDto: UpdateAutoDto) {
    return `This action updates a #${id} auto`;
  }

  async remove(id: number) {
    try {
      const auto = await this.repositoryAuto.findOne({
        where: { id },
      });
      if (!auto) {
        return {
          message: `El auto con #ID ${id} no se encuentra en la base de datos`,
          status: HttpStatus.CONFLICT,
        };
      }
      await this.repositoryAuto.remove(auto);
      return {
        message: `El auto con #ID ${id} ha sido eliminado`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar eliminar el auto con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
