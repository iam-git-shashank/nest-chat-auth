import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import Follower from './entities/follower.entity';
import { CreateFollowerDto } from './dto/follower.dto';
import Users from '../user/entities/user.entity';

export type User = { userId: number; email: string; password: string };

@Injectable()
export class FollowerService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Follower)
    private readonly followerRepo: EntityRepository<Follower>,

    @InjectRepository(Users)
    private readonly userRepo: EntityRepository<Users>,
  ) {}
  async followUser(followerId: number, followingId: number) {
    if (followerId === followingId) {
      throw new Error('Cannot follow yourself');
    }
    console.log(followerId, followingId);
    const follower = await this.userRepo.findOne({ id: followerId });
    const following = await this.userRepo.findOne({ id: followingId });

    if (!follower || !following) {
      throw new NotFoundException('User not found');
    }

    const existingFollow = await this.followerRepo.findOne({
      follower,
      following,
    });

    if (existingFollow) {
      return { message: 'Already following this user' };
    }

    const follow = this.followerRepo.create({ follower, following });
    await this.em.flush();

    return { message: 'Followed successfully' };
  }

  async unfollowUser(followerId: number, followingId: number) {
    const follower = await this.userRepo.findOne({ id: followerId });
    const following = await this.userRepo.findOne({ id: followingId });

    const relation = await this.followerRepo.findOne({
      follower,
      following,
    });

    if (!relation) {
      return { message: 'Not following this user' };
    }

    await this.em.removeAndFlush(relation);
    return { message: 'Unfollowed successfully' };
  }

  async getFollowers(userId: number) {
   const followers = await this.followerRepo.find(
     { following: userId },
     { populate: ['follower', 'following'] },
   );

   // You could filter out users by a "currentUser" check here if necessary
   return followers.map((follower) => ({
     followerId: follower.follower.id,
     followerName: follower.follower.name,
     followingId: follower.following.id,
   }));
  }

  async getFollowing(userId: number) {
   const followingList = await this.followerRepo.find(
     { follower: userId },
     { populate: ['following'] },
   );

   return followingList.map((relation) => {
     const { id, name, email, message } = relation.following;
     return { id, name, email, message };
   });
  }
}
