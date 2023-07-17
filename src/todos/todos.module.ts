import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosGateway } from './todos.gateway';
import { Todo } from './entities/todo.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  providers: [TodosGateway, TodosService],
})
export class TodosModule {}
