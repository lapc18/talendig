import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { StopStation } from '../stop-station/stop-station.entity';

@Table({ tableName: 'times' })
export class Time extends Model {
  @ForeignKey(() => StopStation)
  @Column(DataType.INTEGER)
  stopStationId!: number;

  @BelongsTo(() => StopStation)
  stopStation!: StopStation;

  @Column(DataType.INTEGER)
  weekday!: number;   // 0-6

  @Column(DataType.STRING)
  hour!: string;      // "08:30", "18:45"
}

