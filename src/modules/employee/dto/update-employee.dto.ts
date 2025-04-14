import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @IsOptional()
  @IsString()
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
  name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50, { message: 'Role must be between 2 and 50 characters' })
  role?: string;
}
