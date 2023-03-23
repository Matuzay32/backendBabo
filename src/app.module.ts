import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutoModule } from './auto/auto.module';
import { ImageModule } from './image/image.module';
import { Auto } from './auto/entities/auto.entity';
import { Imagen } from './image/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [Auto, Imagen],
    }),

    AutoModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
