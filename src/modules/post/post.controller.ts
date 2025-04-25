import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entitites/post.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { authGuard } from '../auth/guards/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Endpoint to get all posts
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get('/:userId')
  getPostsByUser(@Param('userId') userId: number) {
    return this.postService.getPostsByUserId(userId);
  }
  @UseGuards(authGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadPost(
    @UploadedFile() file: Express.Multer.File,
    @Body('content') content: string,
    @Req() req,
  ) {
    const imageUrl = await this.postService.uploadImage(file);

    console.log('url', imageUrl);
    const userId = req.user.userId; // or however you're extracting it

    return this.postService.create({
      content,
      imageUrl,
      authorId: userId,
    });
  }
}
