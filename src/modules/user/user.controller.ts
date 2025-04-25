import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/all')
  findAllUsers() {
    return this.userService.findAllUsers();
  }
  @Get('search')
  async searchUsers(@Query('query') query: string) {
    return this.userService.searchUsers(query);
  }
  //   @Post()
  //   create(@Body() dto:CreateUserDto) {
  //   return this.userService.create(dto);
  // }
}