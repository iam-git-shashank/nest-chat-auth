import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Likes } from './entities/likes.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Post } from '../post/entitites/post.entity';
import Users from '../user/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private likeRepo: EntityRepository<Likes>,
    @InjectRepository(Post)
    private postRepo: EntityRepository<Post>,
    @InjectRepository(Users)
    private userRepo: EntityRepository<Users>,
    private readonly em: EntityManager,
  ) {}
  async likePost(userId: number, postId: number) {
    const user = await this.userRepo.findOne(userId);
    const post = await this.postRepo.findOne(postId);

    if (!user || !post) throw new NotFoundException('User or post not found');

    const existingLike = await this.likeRepo.findOne({ user, post });
    if (existingLike) {
      // throw new BadRequestException('Already liked');
      return this.unlikePost(userId, postId);
    }
    const like = this.likeRepo.create({ user, post, createdAt: new Date() });
    await this.em.flush();

    return { message: 'Post liked' };
  }

  async unlikePost(userId: number, postId: number) {
    const user = await this.userRepo.findOne(userId);
    const post = await this.postRepo.findOne(postId);

    const like = await this.likeRepo.findOne({ user, post });
    if (!like) throw new NotFoundException('Like not found');

    await this.em.removeAndFlush(like);
    return { message: 'Post unliked' };
  }

  async getLikesForPost(postId: number) {
    return this.likeRepo.find({ post: postId }, { populate: ['user'] });
  }
  async getlikedornot(postId:number,userId:number) {
    const like = await this.likeRepo.findOne({ post: postId, user: userId });
    return { liked: !!like };
  }
  async getPostsLikedByUser(userId: number) {
    const likes = await this.likeRepo.find(
      { user: userId },
      { populate: ['post', 'post.author'], orderBy: { createdAt: 'DESC' } },
    );

    return likes.map((like) => ({
      id: like.post.id,
      content: like.post.content,
      imageUrl: like.post.imageUrl,
      createdAt: like.post.createdAt,
      author: {
        id: like.post.author.id,
        name: like.post.author.name,
        email: like.post.author.email,
      },
    }));
  }
}
