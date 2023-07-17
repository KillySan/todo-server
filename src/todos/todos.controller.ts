import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosGateway } from './todos.gateway';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todoGateway: TodosGateway) {}

  @Get()
  findAll() {
    throw new Error('Not implemented!');
  }

  @Post()
  @ApiBody({ type: CreateTodoDto })
  create(@Body() createTodoDto: CreateTodoDto) {
    throw new Error('Not implemented!');
  }

  @Patch(':id')
  @ApiParam({ type: 'number', name: 'id' })
  @ApiBody({ type: UpdateTodoDto })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    throw new Error('Not implemented!');
  }

  @Delete()
  removeAll(): void {
    throw new Error('Not implemented!');
  }
}
