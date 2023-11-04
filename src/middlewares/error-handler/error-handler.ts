import { NextFunction, Request, Response } from "express"
import { InternalServerError } from "./errors"
import { BaseError } from "./base-error"

const normalizeError = (err: Error): BaseError => {
  if (err instanceof BaseError) {
    return err
  }

  return new InternalServerError(err)
}

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  // https://expressjs.com/en/guide/error-handling.html#the-default-error-handler
  if (res.headersSent) {
    return next(err)
  }

  const error = normalizeError(err)
  const body = error.getBody()

  res.status(body.statusCode).json({ message: body.message })
}