import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Time } from '../time/time.entity';

@Table({ tableName: 'stop_stations' })
export class StopStation extends Model {
  @Column({ type: DataType.STRING })
  name!: string;

  @Column(DataType.FLOAT)
  latitude!: number;

  @Column(DataType.FLOAT)
  longitude!: number;

  @HasMany(() => Time)
  times!: Time[];
}

