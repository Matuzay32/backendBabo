import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Imagen } from 'src/image/entities/image.entity';

@Entity()
export class Auto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: new Date().getFullYear() })
  year: number;

  @OneToMany(() => Imagen, (image) => image.auto, { cascade: true })
  image: Imagen[];
}
