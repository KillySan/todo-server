import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

export interface ITodosService {
  findAll(): Promise<Todo[]>;
  create(createTodoDto: CreateTodoDto): Promise<Todo>;
  update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo>;
  removeAll(): Promise<void>;
}

@Injectable()
export class TodosService implements ITodosService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create({
      title: createTodoDto.title,
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoModel.findByPk(id);
    todo.set(updateTodoDto);
    await todo.save();

    return todo;
  }

  async removeAll(): Promise<void> {
    await this.todoModel.destroy({ truncate: true });
  }
}
