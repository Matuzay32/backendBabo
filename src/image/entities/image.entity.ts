import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Auto } from 'src/auto/entities/auto.entity';

@Entity()
export class Imagen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Auto, (auto) => auto.image, { onDelete: 'CASCADE' })
  auto: Auto;
}
