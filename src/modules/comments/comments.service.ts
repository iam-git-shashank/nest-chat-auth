import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Comment as Comm } from './entities/comments.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Post } from '../post/entitites/post.entity';
import Users from '../user/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comm)
    private commentRepo: EntityRepository<Comm>,
    @InjectRepository(Post)
      private postRepo: EntityRepository<Post>,
    private readonly em:EntityManager
  ) {}

    async createComment(postId: number, user: number, content: string) {
      
    const post = await this.postRepo.findOneOrFail({ id: postId });
    const comment = this.commentRepo.create({ post, author: user,createdAt:new Date(),text:content });
    await this.em.flush();
    return comment;
  }

  async getCommentsForPost(postId: number) {
    const comments = await this.commentRepo.find(
      { post: postId },
      { populate: ['author'], orderBy: { createdAt: 'ASC' } },
    );

    return comments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      createdAt: comment.createdAt,
      author: {
        id: comment.author.id,
        name: comment.author.name,
        email: comment.author.email,
      },
      post: comment.post.id, // if needed
    }));
  }
}
