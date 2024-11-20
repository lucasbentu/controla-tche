import { HttpStatusCode } from "../../../configs"
import { BaseError } from "../base-error"

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(HttpStatusCode.NOT_FOUND, message)
  }
}
