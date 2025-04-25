import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { authGuard } from '../auth/guards/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}
  @UseGuards(authGuard)
  @Post()
  async create(@Body() dto:CreateCommentDto, @Req() req) {
      const user = req.user; // assumes auth middleware adds user
    

    //   return dto
    return this.commentService.createComment(dto.postId, user.userId, dto.text);
  }

  @Get('post/:postId')
  async getForPost(@Param('postId') postId: number) {
    return this.commentService.getCommentsForPost(postId);
  }
}
