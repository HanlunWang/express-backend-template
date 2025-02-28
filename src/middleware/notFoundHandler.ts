import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle 404 Not Found errors
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    error: `Not Found - ${req.originalUrl}`,
  });
};
