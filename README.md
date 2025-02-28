# Express Backend Template

A robust Express.js backend template, featuring authentication, automatic API documentation, and easy deployment configurations.

## Features

- **TypeScript** - Type-safe code development
- **Authentication System** - JWT-based authentication with role-based access control
- **API Documentation** - Automatic Swagger documentation
- **Environment Configuration** - Development, testing, and production environment separation
- **Docker Support** - Easy containerization for development and production
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
git clone https://github.com/yourusername/express-backend-template.git
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

#### Using Docker

```bash
# Build the Docker image
npm run docker:build

# Run the Docker container
npm run docker:run
```

#### Using Docker Compose

```bash
docker-compose up
```

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
├── Dockerfile                # Docker configuration
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

## License

This project is licensed under the MIT License - see the LICENSE file for details.
