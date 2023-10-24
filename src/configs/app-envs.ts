export class AppEnvs {
  static DATABASE_URL: string = process.env.DATABASE_URL || ''

  static SECRET_JWT: string = process.env.SECRET_JWT || ''
}