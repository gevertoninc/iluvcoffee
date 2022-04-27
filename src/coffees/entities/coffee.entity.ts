import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @Column()
  title: string;

  @JoinTable()
  @ManyToMany(() => Flavor, ({ coffees }) => coffees, { cascade: true })
  flavors: Flavor[];
}
