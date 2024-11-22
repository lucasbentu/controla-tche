import { BaseError } from "../base-error"
import { HttpStatusCode } from "../../../configs"

export class InternalServerError extends BaseError {
  constructor(err: Error) {
    super(HttpStatusCode.INTERNAL_SERVER_ERROR, `internal Server Error: ${err}`,)

    // TODO: need to add monitoring here
    console.log({
      message: err.message,
      stackTrace: err.stack,
      level: 'fatal',
    })
  }
}