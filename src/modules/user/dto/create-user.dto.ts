import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  @Length(2, 50, { message: 'Role must be between 2 and 50 characters' })
  message: string;
  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  @Length(2, 50, { message: 'Role must be between 2 and 50 characters' })
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  @Length(2, 100, { message: 'Role must be between 2 and 50 characters' })
  password: string;
}
