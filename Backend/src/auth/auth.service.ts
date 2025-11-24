import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { OAuthProfile } from './types/oauth-profile';

export type User = {
  id: string;
  email: string;
  name: string;
  provider: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateOAuthLogin(provider: string, profile: OAuthProfile) {
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName;

    let user = await this.usersService.findByEmail(email);

    if (!user) {
      const createdUser = this.usersService.createOAuthUser({
        email,
        name,
        provider,
        providerId: profile.id,
      });
      user = { ...createdUser, id: String(createdUser.id) };
    }

    const token = this.jwtService.sign({ userId: user.id, email: user.email });

    return { token, user };
  }
}
