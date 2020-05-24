export interface User {
  readonly id: number;
  readonly login: string;
  readonly ownedAppIds: number[];
}
