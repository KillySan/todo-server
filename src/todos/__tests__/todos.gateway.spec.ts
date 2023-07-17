import { Test, TestingModule } from '@nestjs/testing';
import { TodosGateway } from '../todos.gateway';
import { TodosService, ITodosService } from '../todos.service';
import {
  todos,
  todoActive,
  todoDone,
  createTodoDto,
} from '../fixtures/todos.fixtures';
import { Todo } from '../entities/todo.entity';
import { TODO_EVENTS } from '../todos.constants';

describe('TodosGateway', () => {
  let todosGateway: TodosGateway;
  let todosService: TodosService;
  let app;

  const todosServiceMock: ITodosService = {
    findAll: jest.fn(() => Promise.resolve(todos as Todo[])),
    create: jest.fn(() => Promise.resolve(todoActive as Todo)),
    update: jest.fn(() => Promise.resolve(todoDone as Todo)),
    removeAll: jest.fn(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosGateway,
        {
          provide: TodosService,
          useValue: todosServiceMock,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.listen(6000);

    todosGateway = module.get<TodosGateway>(TodosGateway);
    todosService = module.get<TodosService>(TodosService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(todosGateway).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return array of todos', async () => {
      const wssServerEmitSpy = jest.spyOn(todosGateway.wss, 'emit');
      const findAllSpy = jest.spyOn(todosService, 'findAll');

      await todosGateway.findAll();

      expect(findAllSpy).toBeCalled();
      expect(findAllSpy).toHaveReturnedWith(Promise.resolve(todos));
      expect(wssServerEmitSpy).toHaveBeenCalled();
    });
  });

  describe('create()', () => {
    it('should create todo and return new record', async () => {
      const wssServerEmitSpy = jest.spyOn(todosGateway.wss, 'emit');
      const serviceCreateSpy = jest.spyOn(todosService, 'create');

      await todosGateway.create(createTodoDto);

      expect(serviceCreateSpy).toHaveBeenCalled();
      expect(serviceCreateSpy).toHaveBeenCalledWith(createTodoDto);
      expect(wssServerEmitSpy).toHaveBeenCalled();
      expect(wssServerEmitSpy).toHaveBeenCalledWith(
        TODO_EVENTS.CREATE,
        todoActive
      );
    });
  });

  describe('update()', () => {
    it('should update status of todo and return record', async () => {
      const wssServerEmitSpy = jest.spyOn(todosGateway.wss, 'emit');
      const serviceUpdateSpy = jest.spyOn(todosService, 'update');

      await todosGateway.update(todoActive);

      expect(serviceUpdateSpy).toHaveBeenCalled();
      expect(serviceUpdateSpy).toHaveBeenCalledWith(todoActive.id, todoActive);
      expect(wssServerEmitSpy).toHaveBeenCalled();
      expect(wssServerEmitSpy).toHaveBeenCalledWith(
        TODO_EVENTS.UPDATE,
        todoDone
      );
    });
  });

  describe('removeAll()', () => {
    it('should remove all todos', async () => {
      const wssServerEmitSpy = jest.spyOn(todosGateway.wss, 'emit');
      const serviceRemoveAllSpy = jest.spyOn(todosService, 'removeAll');

      await todosGateway.removeAll();

      expect(serviceRemoveAllSpy).toHaveBeenCalled();
      expect(wssServerEmitSpy).toHaveBeenCalled();
      expect(wssServerEmitSpy).toHaveBeenCalledWith(TODO_EVENTS.REMOVE_ALL);
    });
  });
});
