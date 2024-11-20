import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "./error-handler/errors";
import { AppEnvs } from "../configs";
import jwt from 'jsonwebtoken'
import { UserPayloadDto } from "../shared/dtos";
import { Session } from "./session";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    throw new UnauthorizedError('Invalid Token.')
  }

  jwt.verify(token.replace('Bearer ', ''), AppEnvs.SECRET_JWT, (err, payload) => {
    if (err) {
      throw new UnauthorizedError('Invalid Token.')
    }

    Session.user = payload as UserPayloadDto
    
    next();
  });
}