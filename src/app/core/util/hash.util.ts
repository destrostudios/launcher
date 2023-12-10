import * as bcrypt from 'bcryptjs';

export function generateSalt(): string {
  return bcrypt.genSaltSync(10);
}

export function hashSecret(secret: string, salt: string): string {
  return bcrypt.hashSync(secret, salt);
}
