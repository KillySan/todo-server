import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosGateway } from './todos.gateway';
import { TodosController } from './todos.controller';
import { Todo } from './entities/todo.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  providers: [TodosGateway, TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
