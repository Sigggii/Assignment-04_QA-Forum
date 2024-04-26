export class EnvVarNotFoundError extends Error {
  constructor(envVariable: string) {
    super(`EnvVariable "${envVariable}" not set!`)
  }
}
