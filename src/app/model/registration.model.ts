export interface Registration {
  readonly login: string;
  readonly saltClient: string;
  readonly hashedPassword: string;
}
