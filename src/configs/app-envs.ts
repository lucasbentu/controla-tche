export class AppEnvs {
  static PORT: string = process.env.PORT || ''

  static DATABASE_URL: string = process.env.DATABASE_URL || ''

  static SECRET_JWT: string = process.env.SECRET_JWT || ''
}