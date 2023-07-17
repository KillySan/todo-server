import {
  Column,
  Model,
  Table,
  DataType,
  AllowNull,
  Default,
  NotEmpty,
} from 'sequelize-typescript';

export interface TodoAttributes {
  id: number;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoCreationAttributes = Pick<TodoAttributes, 'title'>;

@Table({
  timestamps: true,
  paranoid: true,
})
export class Todo extends Model<TodoAttributes, TodoCreationAttributes> {
  @NotEmpty
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  done: boolean;
}
