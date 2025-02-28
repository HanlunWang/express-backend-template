# Express Backend Template

A robust Express.js backend template, featuring authentication, automatic API documentation, and easy deployment configurations.

## Features

- **TypeScript** - Type-safe code development
- **Authentication System** - JWT-based authentication with role-based access control
- **API Documentation** - Automatic Swagger documentation
- **Environment Configuration** - Development, testing, and production environment separation
- **Docker Support** - Multi-stage Docker builds for development and production
- **AWS Deployment** - CloudFormation template for AWS ECS Fargate deployment
- **Testing** - Jest setup for unit and integration testing
- **Logging** - Structured logging with Winston
- **Error Handling** - Centralized error handling middleware
- **Code Quality** - ESLint and Prettier configuration

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)
- Docker (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/HanlunWang/express-backend-template.git
cd express-backend-template
```

2. Install dependencies:

```bash
npm install
```

3. Create environment variables:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration.

### Running the Application

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm run build
npm start
```

### Docker Setup

This project uses a multi-stage Docker build to optimize both development and production environments.

#### Docker Commands

```bash
# Development mode with hot-reloading
npm run docker:dev

# Production mode
npm run docker:prod

# Build development image
npm run docker:dev:build

# Build production image
npm run docker:prod:build

# Stop all containers
npm run docker:stop

# Stop and remove containers, networks, and volumes
npm run docker:clean
```

#### Docker Environment Configuration

The Docker setup ensures consistent environments between development and production:

- **Development**: Uses nodemon for hot-reloading, mounts the source code as a volume
- **Production**: Uses the compiled JavaScript code, optimized for performance

#### Docker Compose Services

- **app-dev**: Development environment with hot-reloading
- **app-prod**: Production environment with optimized settings
- **mongo**: MongoDB database service

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

## Project Structure

```
.
├── src/                      # Source code
│   ├── config/               # Configuration files
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Express middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   ├── __tests__/            # Tests
│   └── index.ts              # Application entry point
├── aws/                      # AWS deployment files
├── dist/                     # Compiled JavaScript files
├── logs/                     # Application logs
├── .env.example              # Example environment variables
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # Multi-stage Docker configuration
├── .dockerignore             # Files to exclude from Docker build
├── jest.config.js            # Jest configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Deployment

### Docker Deployment

For production deployment using Docker:

1. Build the production image:

```bash
npm run docker:prod:build
```

2. Run the production container:

```bash
npm run docker:prod
```

### AWS Deployment

1. Package the CloudFormation template:

```bash
aws cloudformation package \
  --template-file aws/cloudformation.yml \
  --s3-bucket your-deployment-bucket \
  --output-template-file packaged-template.yml
```

2. Deploy the CloudFormation stack:

```bash
aws cloudformation deploy \
  --template-file packaged-template.yml \
  --stack-name express-backend \
  --parameter-overrides \
    Environment=prod \
    MongoDBUri=your-mongodb-uri \
    JwtSecret=your-jwt-secret \
  --capabilities CAPABILITY_IAM
```

## Environment Consistency

This project is designed to ensure consistency between development and production environments:

1. **Docker Multi-stage Builds**: The Dockerfile uses multi-stage builds to create optimized images for both development and production.
2. **Environment Variables**: Environment variables are managed consistently across all environments.
3. **Volume Mounting**: In development, source code is mounted as a volume for hot-reloading.
4. **Dependency Management**: Dependencies are installed consistently in all environments.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
