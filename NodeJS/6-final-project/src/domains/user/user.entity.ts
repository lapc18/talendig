import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ type: DataType.STRING, unique: true })
  email!: string;

  @Column(DataType.STRING)
  displayName?: string;
}

