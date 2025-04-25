import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { authGuard } from '../auth/guards/auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import Users from '../user/entities/user.entity';
import { CreateFollowerDto } from './dto/follower.dto';

@Controller('follow')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}
  @UseGuards(authGuard)
  @Post('followed/:userId')
  async followUser(@Param('userId') userId: number, @Req() req) {
    console.log('dsdsds');
    const followerId = req.user.userId;
    const followingId = userId;
    return this.followerService.followUser(followerId, followingId);
  }
  @UseGuards(authGuard)
  @Delete('unfollow')
  async unfollowUser(@GetUser() user: Users, @Body() followingId: number) {
    return this.followerService.unfollowUser(user.id, followingId);
  }
  @Get('followers/:userId')
  async getFollowers(@Param('userId') userId: number) {
    return this.followerService.getFollowers(userId);
  }

  @Get('/following/:userId')
  async getFollowing(@Param('userId') userId: number) {
    return this.followerService.getFollowing(userId);
  }
}