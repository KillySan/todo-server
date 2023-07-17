import {
  TodoAttributes,
  TodoCreationAttributes,
} from '../entities/todo.entity';

export const todos: TodoAttributes[] = [
  {
    id: 1,
    title: 'Task 1',
    done: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    title: 'Task 2',
    done: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    title: 'Task 3',
    done: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const createTodoDto: TodoCreationAttributes = {
  title: 'Test task',
};

export const todoActive = {
  id: 1,
  title: createTodoDto.title,
  done: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const todoDone = {
  ...todoActive,
  done: true,
};
