import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from '../todos.service';
import { Todo } from '../entities/todo.entity';
import { getModelToken } from '@nestjs/sequelize';
import {
  todos,
  createTodoDto,
  todoActive,
  todoDone,
} from '../fixtures/todos.fixtures';

describe('TodosService', () => {
  let service: TodosService;
  let model: typeof Todo;

  const modelInstanceMethods = {
    save: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getModelToken(Todo),
          useValue: {
            findAll: jest.fn(() => todos),
            create: jest.fn(() =>
              Object.assign(todoActive, modelInstanceMethods)
            ),
            findByPk: jest.fn(() =>
              Object.assign(todoDone, modelInstanceMethods)
            ),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    model = module.get<typeof Todo>(getModelToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should successfully return array of todos', async () => {
      const findAllSpy = jest.spyOn(model, 'findAll');
      const findedTodos = await service.findAll();
      expect(findAllSpy).toHaveBeenCalled();
      expect(findedTodos).toEqual(todos);
    });
  });

  describe('create()', () => {
    it('should successfully create a todo and return it', async () => {
      const createSpy = jest.spyOn(model, 'create');
      const createdTodo = await service.create(createTodoDto);
      expect(createSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith(createTodoDto);
      expect(createdTodo).toEqual(todoActive);
    });
  });

  describe('update()', () => {
    it('should successfully update a todo and return it', async () => {
      const findByPkSpy = jest.spyOn(model, 'findByPk');
      const updatedTodo = await service.update(todoActive.id, todoActive);
      expect(findByPkSpy).toHaveBeenCalled();
      expect(findByPkSpy).toHaveBeenCalledWith(todoActive.id);
      expect(updatedTodo).toEqual(todoDone);
    });
  });

  describe('removeAll()', () => {
    it('should successfully remove all todos', async () => {
      const destroySpy = jest.spyOn(model, 'destroy');
      await service.removeAll();
      expect(destroySpy).toHaveBeenCalled();
      expect(destroySpy).toHaveBeenCalledWith({ truncate: true });
    });
  });
});
