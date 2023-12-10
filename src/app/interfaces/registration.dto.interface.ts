export interface RegistrationDto {
  readonly login: string;
  readonly email: string;
  readonly saltClient: string;
  readonly clientHashedPassword: string;
}
