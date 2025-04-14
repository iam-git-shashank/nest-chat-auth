import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTrainDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
  name: string;
}
