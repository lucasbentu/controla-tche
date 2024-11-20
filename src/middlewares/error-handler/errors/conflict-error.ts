import { HttpStatusCode } from "../../../configs"
import { BaseError } from "../base-error"

export class ConflictError extends BaseError {
  constructor(message: string) {
    super(HttpStatusCode.CONFLICT, message)
  }
}
