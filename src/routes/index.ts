import express from 'express';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import helloRoutes from './helloRoutes';
import exampleRoutes from './exampleRoutes';

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Auth routes
router.use('/auth', authRoutes);

// Product routes
router.use('/products', productRoutes);

// Hello World example routes
router.use('/hello', helloRoutes);

// Database example routes
router.use('/examples', exampleRoutes);

export default router;
