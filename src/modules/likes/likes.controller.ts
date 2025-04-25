import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-likes.dto';
import { authGuard } from '../auth/guards/auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}
  @UseGuards(authGuard)
  @Post()
  async likePost(@Body() dto: CreateLikeDto) {
    console.log(dto, 'dsds');
    return this.likeService.likePost(dto.userId, dto.postId);
  }
  @UseGuards(authGuard)
  @Delete()
  async unlikePost(@Body() dto: CreateLikeDto) {
    return this.likeService.unlikePost(dto.userId, dto.postId);
  }

  @Get(':postId')
  async getLikes(@Param('postId') postId: number) {
    return this.likeService.getLikesForPost(postId);
  }
  @Get('liked/:userId')
  async getLikedPosts(@Param('userId', ParseIntPipe) userId: number) {
    return this.likeService.getPostsLikedByUser(userId);
  }
  @Get('isliked/:postId/:userId')
  async isPostLiked(
    @Param('postId') postId: number,
    @Param('userId') userId: number,
  ) {
    return this.likeService.getlikedornot(postId,userId);
  }
}
