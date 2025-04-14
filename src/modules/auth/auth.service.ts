import {
  forwardRef,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.gaurd';
import RequestWithUser from './reqwithUser.interface';
import { User, UserService } from '../user/user.service';
import Users from '../user/entities/user.entity';
import { use } from 'passport';
import { ThrowStatement } from 'ts-morph';
import cookieParser from 'cookie-parser';

type SignInData = { userId: number; email: string };
type AuthInput = { email: string; password: string };

type AuthResult = { email: string; userId: number; accessToken: string };

export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = 'undefined';
      return createdUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(
    auth_inp: AuthInput,
  ): Promise<AuthResult | null> {
    try {
      // console.log(auth_inp.email);

      const user = await this.userService.getByEmail(auth_inp.email);
      console.log(user);
      const is_in = await this.verifyPassword(auth_inp.password, user.password);
      user.password = '';
      return this.signInToken({ userId: user.id, email: user.email });
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      console.log('pass wro');

      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    return isPasswordMatching;
  }
  async signInToken(user: SignInData): Promise<AuthResult | null> {
    const tokenPayload = { sub: user.userId, username: user.email };
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return { accessToken, email: user.email, userId: user.userId };
  }

  public async getUserFromAuthenticationToken(token: string) {
    const tokenPayload = await this.jwtService.verifyAsync(token);

    if (tokenPayload.username) {
      console.log(tokenPayload.username);
      return this.userService.getByEmail(tokenPayload.username);
    }
  }

  public getCookieWithJwtToken(inp: AuthInput) {
    // const payload: { userId: number } = { userId };
    // const token = this.jwtService.sign(payload);
    // return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }
}
