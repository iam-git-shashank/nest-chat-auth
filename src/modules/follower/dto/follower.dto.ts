import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateFollowerDto {
  @IsNumber()
  followerId: number;

  @IsNumber()
  followingId: number;
}
