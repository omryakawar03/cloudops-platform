// src/common/request-id.middleware.ts

import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const requestId = uuidv4();

  req['requestId'] = requestId;
  res.setHeader('X-Request-Id', requestId);

  next();
}