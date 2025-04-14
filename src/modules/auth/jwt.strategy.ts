import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import Users from '../user/entities/user.entity';
import { User } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(user: {
    email: string;
    password: string;
  }): Promise<{ email: string; userId: number } | null> {
    return this.authenticationService.getAuthenticatedUser(user);
  }
}
