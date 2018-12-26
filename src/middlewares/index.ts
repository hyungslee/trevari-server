import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
  request.user = { userId : 1, name: 'galbi' };
  next();
};
