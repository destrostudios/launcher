export interface HttpData<T> {
  readonly isLoading: boolean;
  readonly data: T;
  readonly error: any;
}
