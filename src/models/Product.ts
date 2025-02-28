import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface for Product document
 */
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  quantity: number;
  tags: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         inStock:
 *           type: boolean
 *           description: Whether the product is in stock
 *         quantity:
 *           type: number
 *           description: The quantity of the product in stock
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the product
 *         imageUrl:
 *           type: string
 *           description: URL to the product image
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the product was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the product was last updated
 *       example:
 *         id: 60d0fe4f5311236168a109cb
 *         name: Smartphone X
 *         description: Latest smartphone with advanced features
 *         price: 999.99
 *         category: electronics
 *         inStock: true
 *         quantity: 50
 *         tags: [smartphone, electronics, new]
 *         imageUrl: https://example.com/images/smartphone-x.jpg
 *         createdAt: 2021-06-21T12:00:00.000Z
 *         updatedAt: 2021-06-21T12:00:00.000Z
 */

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity cannot be negative'],
    },
    tags: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create a text index for search functionality
productSchema.index({ name: 'text', description: 'text', category: 'text' });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
