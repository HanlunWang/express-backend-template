import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface for Example document
 */
export interface IExample extends Document {
  title: string;
  description: string;
  isActive: boolean;
  tags: string[];
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Example:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the example
 *         title:
 *           type: string
 *           description: The title of the example
 *         description:
 *           type: string
 *           description: The description of the example
 *         isActive:
 *           type: boolean
 *           description: Whether the example is active
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the example
 *         count:
 *           type: number
 *           description: A simple counter
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the example was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the example was last updated
 *       example:
 *         id: 60d0fe4f5311236168a109cc
 *         title: Example Title
 *         description: This is an example description
 *         isActive: true
 *         tags: [example, demo, test]
 *         count: 42
 *         createdAt: 2021-06-21T12:00:00.000Z
 *         updatedAt: 2021-06-21T12:00:00.000Z
 */

const exampleSchema = new Schema<IExample>(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Example = mongoose.model<IExample>('Example', exampleSchema);

export default Example;
