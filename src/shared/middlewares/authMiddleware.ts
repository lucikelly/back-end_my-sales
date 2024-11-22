import AppError from "@shared/errors/AppError";
import { NextFunction, Response, Request } from "express";
import { Secret, verify } from "jsonwebtoken";

interface ITokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}


export default class AuthMiddleware {
  static execute(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT Token is missing.', 401);

    }

    const [, token] = authHeader.split(' ');

    try {
      const decodedToken = verify(token, process.env.APP_SECRET as Secret);
      const { sub } = decodedToken as ITokenPayLoad;

      request.user = {
        id: sub
      }

      return next()

    } catch (error) {
      throw new AppError('Invalid JWT Token.', 401);
      
    }

  }
}