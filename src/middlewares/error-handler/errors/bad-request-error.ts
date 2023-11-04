import { BaseError } from "../base-error"

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(400, message)
  }
}
