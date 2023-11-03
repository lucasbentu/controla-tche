export class BaseError extends Error {

  public statusCode: number

  constructor(statusCode: number, message?: string) {
    super(message)

    this.statusCode = statusCode
  }

  getBody() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    }
  }
}