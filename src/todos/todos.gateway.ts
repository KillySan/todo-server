import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { TODO_EVENTS } from './todos.constants';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TodosGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  wss: Server;

  private logger: Logger = new Logger('TodoGateway');

  constructor(private readonly todosService: TodosService) {}

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
  afterInit() {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage(TODO_EVENTS.FIND_ALL)
  async findAll() {
    const todos = await this.todosService.findAll();
    this.wss.emit(TODO_EVENTS.FIND_ALL, todos);
  }

  @SubscribeMessage(TODO_EVENTS.CREATE)
  async create(@MessageBody() createTodoDto: CreateTodoDto) {
    const todo = await this.todosService.create(createTodoDto);
    this.wss.emit(TODO_EVENTS.CREATE, todo);
  }

  @SubscribeMessage(TODO_EVENTS.UPDATE)
  async update(@MessageBody() updateTodoDto: UpdateTodoDto) {
    this.logger.log('UPDATE');

    const todo = await this.todosService.update(
      updateTodoDto.id,
      updateTodoDto
    );
    this.wss.emit(TODO_EVENTS.UPDATE, todo);
  }

  @SubscribeMessage(TODO_EVENTS.REMOVE_ALL)
  async removeAll() {
    await this.todosService.removeAll();
    this.wss.emit(TODO_EVENTS.REMOVE_ALL);
  }
}
