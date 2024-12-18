import { HttpStatusCode } from "../../../configs"
import { BaseError } from "../base-error"

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(HttpStatusCode.UNAUTHORIZED, message)
  }
}
