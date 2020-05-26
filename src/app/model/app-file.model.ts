export interface AppFile {
  readonly id: number;
  readonly path: string;
  readonly sizeBytes: number;
  readonly checksumSha256: string;
}
