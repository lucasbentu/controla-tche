import { BaseError } from "../base-error"

export class ConflictError extends BaseError {
  constructor(message: string) {
    super(409, message)
  }
}
