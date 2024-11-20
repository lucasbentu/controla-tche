import { BaseError } from "../base-error"

export class GenericError extends BaseError {
  constructor(statusCode: number, message: string) {
    super(statusCode, message)
  }
}
