import { IsNotEmpty, IsString, Length } from "class-validator";



export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  @Length(2, 50, { message: 'Role must be between 2 and 50 characters' })
  role: string;
}
