import { NextFunction, Request, Response } from "express";
import { AppEnvs } from "../configs";
import jwt from 'jsonwebtoken'

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token.replace('Bearer ', ''), AppEnvs.SECRET_JWT, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    req.body.user = payload;
    next();
  });
}