export interface FormInput {
  readonly name: string;
  readonly title: string;
  readonly type: string;
  readonly config: any;
}

export interface FormLink {
  readonly title: string;
  readonly action: () => void;
}

export interface FormValues {
  [name: string]: any;
}
