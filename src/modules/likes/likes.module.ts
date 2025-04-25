import { Module } from '@nestjs/common';
import Users from '../user/entities/user.entity';
import { Post } from '../post/entitites/post.entity';
import { Likes } from './entities/likes.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Users,Post,Likes ])],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
