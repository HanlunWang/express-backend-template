import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Example from '../models/Example';
import { ApiError } from '../middleware/errorHandler';
import mongoose from 'mongoose';

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
 *             $ref: '#/components/schemas/Example'
 *     responses:
 *       201:
 *         description: Example created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Example'
 *       400:
 *         description: Invalid input data
 */
export const createExample = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        new ApiError(400, 'Validation error: ' + JSON.stringify(errors.array()))
      );
      return;
    }

    // Create example
    const example = await Example.create(req.body);

    res.status(201).json({
      success: true,
      data: example,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /examples:
 *   get:
 *     summary: Get all examples
 *     tags: [Examples]
 *     parameters:
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter by tag
 *     responses:
 *       200:
 *         description: List of examples
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Example'
 */
export const getExamples = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filter: any = {};

    // Filter by isActive
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === 'true';
    }

    // Filter by tag
    if (req.query.tag) {
      filter.tags = { $in: [req.query.tag] };
    }

    // Execute query
    const examples = await Example.find(filter);

    res.status(200).json({
      success: true,
      count: examples.length,
      data: examples,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /examples/{id}:
 *   get:
 *     summary: Get an example by ID
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
 *         description: Example details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Example'
 *       404:
 *         description: Example not found
 */
export const getExampleById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const example = await Example.findById(req.params.id);

    if (!example) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }

    res.status(200).json({
      success: true,
      data: example,
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error instanceof mongoose.Error.CastError) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }
    next(error);
  }
};

/**
 * @swagger
 * /examples/{id}:
 *   put:
 *     summary: Update an example
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
 *             $ref: '#/components/schemas/Example'
 *     responses:
 *       200:
 *         description: Example updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Example'
 *       404:
 *         description: Example not found
 */
export const updateExample = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const example = await Example.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!example) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }

    res.status(200).json({
      success: true,
      data: example,
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error instanceof mongoose.Error.CastError) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }
    next(error);
  }
};

/**
 * @swagger
 * /examples/{id}:
 *   delete:
 *     summary: Delete an example
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Example not found
 */
export const deleteExample = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const example = await Example.findByIdAndDelete(req.params.id);

    if (!example) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error instanceof mongoose.Error.CastError) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }
    next(error);
  }
};

/**
 * @swagger
 * /examples/{id}/increment:
 *   patch:
 *     summary: Increment the count field of an example
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Example ID
 *       - in: query
 *         name: value
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Value to increment by
 *     responses:
 *       200:
 *         description: Count incremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Example'
 *       404:
 *         description: Example not found
 */
export const incrementCount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incrementValue = parseInt(req.query.value as string) || 1;

    const example = await Example.findByIdAndUpdate(
      req.params.id,
      { $inc: { count: incrementValue } },
      { new: true }
    );

    if (!example) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }

    res.status(200).json({
      success: true,
      data: example,
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error instanceof mongoose.Error.CastError) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }
    next(error);
  }
};

/**
 * @swagger
 * /examples/{id}/tags:
 *   post:
 *     summary: Add tags to an example
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
 *               - tags
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Tags added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Example'
 *       404:
 *         description: Example not found
 */
export const addTags = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check if tags array exists
    if (!req.body.tags || !Array.isArray(req.body.tags)) {
      next(new ApiError(400, 'Tags array is required'));
      return;
    }

    const example = await Example.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { tags: { $each: req.body.tags } } },
      { new: true }
    );

    if (!example) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }

    res.status(200).json({
      success: true,
      data: example,
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error instanceof mongoose.Error.CastError) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }
    next(error);
  }
};

/**
 * @swagger
 * /examples/{id}/tags/{tag}:
 *   delete:
 *     summary: Remove a tag from an example
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Example ID
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag to remove
 *     responses:
 *       200:
 *         description: Tag removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Example'
 *       404:
 *         description: Example not found
 */
export const removeTag = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const example = await Example.findByIdAndUpdate(
      req.params.id,
      { $pull: { tags: req.params.tag } },
      { new: true }
    );

    if (!example) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }

    res.status(200).json({
      success: true,
      data: example,
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error instanceof mongoose.Error.CastError) {
      next(new ApiError(404, `Example not found with id of ${req.params.id}`));
      return;
    }
    next(error);
  }
};
