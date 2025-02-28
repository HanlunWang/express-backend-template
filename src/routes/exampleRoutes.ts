import express from 'express';
import { body } from 'express-validator';
import {
  createExample,
  getExamples,
  getExampleById,
  updateExample,
  deleteExample,
  incrementCount,
  addTags,
  removeTag,
} from '../controllers/exampleController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Examples
 *   description: Example endpoints for demonstrating database operations
 */

/**
 * @swagger
 * /examples:
 *   get:
 *     summary: Get all examples
 *     tags: [Examples]
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
 *     responses:
 *       200:
 *         description: List of examples
 *       500:
 *         description: Server error
 */
// Get all examples
router.get('/', getExamples);

/**
 * @swagger
 * /examples:
 *   post:
 *     summary: Create a new example
 *     tags: [Examples]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *                 default: true
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               count:
 *                 type: integer
 *                 default: 0
 *     responses:
 *       201:
 *         description: Example created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
// Create a new example
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional(),
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive must be a boolean'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
    body('count').optional().isInt().withMessage('Count must be an integer'),
  ],
  createExample
);

/**
 * @swagger
 * /examples/{id}:
 *   get:
 *     summary: Get example by ID
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Example ID
 *     responses:
 *       200:
 *         description: Example found
 *       404:
 *         description: Example not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update example by ID
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Example ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               count:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Example updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Example not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete example by ID
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Example ID
 *     responses:
 *       200:
 *         description: Example deleted successfully
 *       404:
 *         description: Example not found
 *       500:
 *         description: Server error
 */
// Get, update and delete example by ID
router
  .route('/:id')
  .get(getExampleById)
  .put(
    [
      body('title').notEmpty().withMessage('Title is required'),
      body('description').optional(),
      body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),
      body('tags').optional().isArray().withMessage('Tags must be an array'),
      body('count').optional().isInt().withMessage('Count must be an integer'),
    ],
    updateExample
  )
  .delete(deleteExample);

// Increment count
router.patch('/:id/increment', incrementCount);

// Add tags
router.post(
  '/:id/tags',
  [body('tags').isArray().withMessage('Tags must be an array')],
  addTags
);

// Remove tag
router.delete('/:id/tags/:tag', removeTag);

export default router;
