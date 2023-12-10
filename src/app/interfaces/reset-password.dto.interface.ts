export interface ResetPasswordDto {
  readonly emailSecret: string;
  readonly clientHashedPassword: string;
}
