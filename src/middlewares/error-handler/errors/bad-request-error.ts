import { HttpStatusCode } from "../../../configs"
import { BaseError } from "../base-error"

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(HttpStatusCode.BAD_REQUEST, message)
  }
}
