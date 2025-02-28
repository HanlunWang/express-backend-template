// Type declarations for local modules
declare module './middleware/notFoundHandler' {
  import { Request, Response, NextFunction } from 'express';
  export const notFoundHandler: (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => void;
}

declare module './config/swagger' {
  import express from 'express';
  export const setupSwagger: (app: express.Application) => void;
}

declare module './routes' {
  import express from 'express';
  const router: express.Router;
  export default router;
}
