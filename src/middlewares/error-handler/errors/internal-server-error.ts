import { BaseError } from "../base-error"

export class InternalServerError extends BaseError {
  constructor(err: Error) {
    super(500, 'internal Server Error',)

    // TODO: need to add monitoring here
    console.log({
      message: err.message,
      stackTrace: err.stack,
      level: 'fatal',
    })
  }
}