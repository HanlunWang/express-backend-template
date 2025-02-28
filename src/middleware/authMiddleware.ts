import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from './errorHandler';
import User from '../models/User';

/**
 * Interface for JWT payload
 */
interface JwtPayload {
  id: string;
}

/**
 * Extend Express Request interface to include user
 */
// Augment the Express Request interface using module augmentation
import 'express';
declare module 'express' {
  interface Request {
    user?: any;
  }
}

/**
 * Middleware to protect routes that require authentication
 */
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      next(new ApiError(401, 'Not authorized, no token'));
      return;
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_jwt_secret'
    ) as JwtPayload;

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      next(new ApiError(401, 'Not authorized, user not found'));
      return;
    }

    // Set user in request
    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, 'Not authorized, invalid token'));
  }
};

/**
 * Middleware to restrict access to specific roles
 * @param roles Array of roles allowed to access the route
 */
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new ApiError(401, 'Not authorized, no user'));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(
        new ApiError(
          403,
          `User role ${req.user.role} is not authorized to access this route`
        )
      );
      return;
    }

    next();
  };
};
