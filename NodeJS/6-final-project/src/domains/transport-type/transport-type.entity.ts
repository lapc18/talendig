import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Syndicate } from '../syndicate/syndicate.entity';

export enum TransportTypeEnum {
  Public = 'Public',
  Private = 'Private',
}

@Table({ tableName: 'transports' })
export class Transport extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.ENUM(...Object.values(TransportTypeEnum)), allowNull: false })
  type!: TransportTypeEnum;

  @ForeignKey(() => Syndicate)
  @Column(DataType.INTEGER)
  syndicateId?: number;

  @BelongsTo(() => Syndicate)
  syndicate?: Syndicate;
}

