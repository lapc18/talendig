import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Transport } from '../transport-type/transport-type.entity';

@Table({ tableName: 'syndicates' })
export class Syndicate extends Model {
  @Column({ type: DataType.STRING, unique: true })
  name!: string;

  @HasMany(() => Transport)
  transports!: Transport[];
}

