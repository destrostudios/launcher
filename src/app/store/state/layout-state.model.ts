export interface LayoutState {
  readonly language: string;
  readonly route: string;
  readonly isLoginOrRegistrationShown: boolean;
  readonly isAppAdditionToAccountErrorShown: boolean;
  readonly isAppRemovalFromAccountErrorShown: boolean;
}
