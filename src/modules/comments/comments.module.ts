import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Users from '../user/entities/user.entity';
import { Comment } from './entities/comments.entity';
import { Post } from '../post/entitites/post.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Users,Comment,Post])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
