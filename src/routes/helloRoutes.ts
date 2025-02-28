import express, { Request, Response } from 'express';
import { body, param, query, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hello
 *   description: Hello World example endpoints
 */

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Basic Hello World endpoint
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: A simple greeting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello, World!',
  });
});

/**
 * @swagger
 * /hello/query:
 *   get:
 *     summary: Hello World with query parameters
 *     tags: [Hello]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name to greet
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *           enum: [en, es, fr, zh, ja]
 *         description: Language for greeting
 *     responses:
 *       200:
 *         description: A personalized greeting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid parameters
 */
router.get(
  '/query',
  [
    query('name').optional().isString().withMessage('Name must be a string'),
    query('language')
      .optional()
      .isIn(['en', 'es', 'fr', 'zh', 'ja'])
      .withMessage('Language must be one of: en, es, fr, zh, ja'),
  ],
  (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const name = req.query.name || 'World';
    const language = req.query.language || 'en';

    let greeting = 'Hello';
    switch (language) {
      case 'es':
        greeting = 'Hola';
        break;
      case 'fr':
        greeting = 'Bonjour';
        break;
      case 'zh':
        greeting = '你好';
        break;
      case 'ja':
        greeting = 'こんにちは';
        break;
    }

    res.status(200).json({
      message: `${greeting}, ${name}!`,
    });
  }
);

/**
 * @swagger
 * /hello/{name}:
 *   get:
 *     summary: Hello World with path parameter
 *     tags: [Hello]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name to greet
 *     responses:
 *       200:
 *         description: A personalized greeting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid parameters
 */
router.get(
  '/:name',
  [param('name').isString().withMessage('Name must be a string')],
  (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.status(200).json({
      message: `Hello, ${req.params.name}!`,
    });
  }
);

/**
 * @swagger
 * /hello:
 *   post:
 *     summary: Hello World with request body
 *     tags: [Hello]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: A personalized greeting with additional info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userInfo:
 *                   type: object
 *       400:
 *         description: Invalid parameters
 */
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('age').optional().isInt().withMessage('Age must be an integer'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Email must be a valid email address'),
  ],
  (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, age, email } = req.body;

    // Create user info object excluding undefined values
    const userInfo: Record<string, any> = { name };
    if (age !== undefined) userInfo.age = age;
    if (email !== undefined) userInfo.email = email;

    res.status(200).json({
      message: `Hello, ${name}!`,
      userInfo,
    });
  }
);

/**
 * @swagger
 * /hello/headers:
 *   get:
 *     summary: Hello World with request headers
 *     tags: [Hello]
 *     parameters:
 *       - in: header
 *         name: x-name
 *         schema:
 *           type: string
 *         description: Name in header
 *       - in: header
 *         name: x-language
 *         schema:
 *           type: string
 *         description: Language in header
 *     responses:
 *       200:
 *         description: A greeting based on headers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 headers:
 *                   type: object
 */
router.get('/headers', (req: Request, res: Response) => {
  const name = req.header('x-name') || 'World';
  const language = req.header('x-language') || 'en';

  let greeting = 'Hello';
  switch (language) {
    case 'es':
      greeting = 'Hola';
      break;
    case 'fr':
      greeting = 'Bonjour';
      break;
    case 'zh':
      greeting = '你好';
      break;
    case 'ja':
      greeting = 'こんにちは';
      break;
  }

  res.status(200).json({
    message: `${greeting}, ${name}!`,
    headers: {
      'x-name': name,
      'x-language': language,
    },
  });
});

export default router;
