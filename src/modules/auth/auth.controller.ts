import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
  HttpStatus,
  Request,
} from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from '../user/user.service'; 
import { authGuard } from './guards/auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthService) {}

  @Post('register')
  register(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.register(registrationData);
  }

  // @HttpCode(200)
  @UseGuards(authGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    return request.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() user: User, @Res() response: Response) {
    // console.log(user)
    const auth_user = await this.authenticationService.getAuthenticatedUser(
      user
    );
    // const cookie = this.authenticationService.getCookieWithJwtToken(user);
    // response.setHeader('Set-Cookie', cookie);
    // user.password = "";
    if (auth_user) {
      return response.send({ auth_user });
    }

    return response.send({ msg: 'dsd' });
  }
}
