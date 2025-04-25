import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Users from '../user/entities/user.entity';
import { Post } from './entitites/post.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Users,Post])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
