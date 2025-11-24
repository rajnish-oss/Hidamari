import { Injectable } from '@nestjs/common';
import { User } from '../auth/auth.service';

interface CreateOAuthUser {
  email: string;
  name: string;
  provider: string;
  providerId: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

async findByEmail(email: string): Promise<User | undefined> {
  return this.users.find((u) => u.email === email);

}
  createOAuthUser(data: CreateOAuthUser): User {
  const user: User = {
    id: Date.now().toString(),
    email: data.email,
    name: data.name,
    provider: data.provider,
    providerId: data.providerId,
  };

  this.users.push(user);
  return user;
}


}
