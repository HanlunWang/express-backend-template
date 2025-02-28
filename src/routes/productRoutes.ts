import express from 'express';
import { body } from 'express-validator';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  patchProduct,
  deleteProduct,
  getCategories,
  createBulkProducts,
  searchProducts,
} from '../controllers/productController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with filtering, sorting and pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort field (e.g. name, price)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Server error
 */
// Get all products with filtering, sorting and pagination
router.get('/', getProducts);

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 *       500:
 *         description: Server error
 */
// Search products
router.get('/search', searchProducts);

/**
 * @swagger
 * /products/categories:
 *   get:
 *     summary: Get all product categories
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of product categories
 *       500:
 *         description: Server error
 */
// Get all product categories
router.get('/categories', getCategories);

/**
 * @swagger
 * /products/bulk:
 *   post:
 *     summary: Create multiple products at once
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     category:
 *                       type: string
 *     responses:
 *       201:
 *         description: Products created successfully
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden - Admin only
 *       500:
 *         description: Server error
 */
// Create bulk products - Admin only
router.post('/bulk', protect, authorize(['admin']), createBulkProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 minimum: 0
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden - Admin only
 *       500:
 *         description: Server error
 */
// Create a product - Admin only
router.post(
  '/',
  protect,
  authorize(['admin']),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price')
      .isNumeric()
      .withMessage('Price must be a number')
      .isFloat({ min: 0 })
      .withMessage('Price must be greater than or equal to 0'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  createProduct
);

// Get, update, patch and delete product by ID
router
  .route('/:id')
  .get(getProductById)
  .put(
    protect,
    authorize(['admin']),
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('description').notEmpty().withMessage('Description is required'),
      body('price')
        .isNumeric()
        .withMessage('Price must be a number')
        .isFloat({ min: 0 })
        .withMessage('Price must be greater than or equal to 0'),
      body('category').notEmpty().withMessage('Category is required'),
    ],
    updateProduct
  )
  .patch(protect, authorize(['admin']), patchProduct)
  .delete(protect, authorize(['admin']), deleteProduct);

export default router;
