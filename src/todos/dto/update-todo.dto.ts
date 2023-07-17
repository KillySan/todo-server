import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { IsNumber, IsNotEmpty, IsPositive, IsBoolean } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  done: boolean;
}
