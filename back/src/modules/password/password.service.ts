import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PASSWORD_SALT as salt } from '@/config';

@Injectable()
export class PasswordService {
  public hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
  public comparePasswords(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
