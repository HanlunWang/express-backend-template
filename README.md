# 🚀 Express Backend Template

A robust Express.js backend template with enterprise-grade features, designed for scalable and maintainable Node.js applications.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)
![Express](https://img.shields.io/badge/Express-v4-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-v4-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

- **🔷 TypeScript** - Write type-safe code with enhanced developer experience and fewer runtime errors
- **🔐 Authentication System** - Secure JWT-based authentication with role-based access control (RBAC)
- **📚 API Documentation** - Automatic Swagger documentation generation for your API endpoints
- **🔧 Environment Configuration** - Seamless switching between development, testing, and production environments
- **🐳 Docker Support** - Optimized multi-stage Docker builds for both development and production
- **☁️ AWS Deployment** - Ready-to-use CloudFormation template for AWS ECS Fargate deployment
- **🧪 Testing** - Comprehensive Jest setup for unit and integration testing
- **📝 Logging** - Structured logging with Winston for better debugging and monitoring
- **🛡️ Error Handling** - Robust centralized error handling middleware
- **✅ Code Quality** - Enforced code standards with ESLint and Prettier configuration

## 🚦 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Docker** (optional, for containerized development/deployment)

### 📥 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/HanlunWang/express-backend-template.git
cd express-backend-template
```

2. **Install dependencies:**

```bash
npm install
# or with yarn
yarn install
```

3. **Set up environment variables:**

```bash
cp .env.example .env
```

4. **Configure your environment:**
   Open the `.env` file in your favorite editor and update the configuration values:
   - Database connection string
   - JWT secret key
   - API port
   - Logging levels
   - Other application-specific settings

### 🏃‍♂️ Running the Application

#### Development Mode (with hot-reloading)

```bash
npm run dev
# or with yarn
yarn dev
```

#### Production Mode

```bash
npm run build
npm start
# or with yarn
yarn build
yarn start
```

## 🐳 Docker Setup

This project features a sophisticated multi-stage Docker build process that optimizes both development and production environments.

### Docker Commands

```bash
# Start development environment with hot-reloading
npm run docker:dev

# Start production environment
npm run docker:prod

# Build development Docker image
npm run docker:dev:build

# Build production Docker image
npm run docker:prod:build

# Stop all running containers
npm run docker:stop

# Clean up containers, networks, and volumes
npm run docker:clean
```

### 🔄 Docker Environment Configuration

The Docker setup ensures consistent environments across all stages of development:

- **🛠️ Development Environment:**

  - Uses nodemon for automatic server restarts
  - Mounts source code as a volume for real-time code changes
  - Includes development dependencies for better debugging

- **🏭 Production Environment:**
  - Uses compiled JavaScript code for optimal performance
  - Minimizes image size by excluding development dependencies
  - Implements proper Node.js best practices for containers

### Docker Compose Services

The project includes a comprehensive `docker-compose.yml` with the following services:

- **app-dev**: Development environment with hot-reloading capability
- **app-prod**: Production-optimized environment
- **mongo**: MongoDB database service with persistent data storage

## 📚 API Documentation

The application automatically generates comprehensive API documentation using Swagger UI.

Once the application is running, access the interactive API documentation at:

```
http://localhost:3000/api-docs
```

This documentation includes:

- Detailed endpoint descriptions
- Request/response schemas
- Authentication requirements
- Interactive API testing capability

## 📁 Project Structure

```
.
├── src/                      # Source code directory
│   ├── config/               # Configuration files and environment setup
│   ├── controllers/          # Request handlers and business logic
│   ├── middleware/           # Express middleware components
│   ├── models/               # Mongoose data models
│   ├── routes/               # API route definitions
│   ├── utils/                # Utility functions and helpers
│   ├── __tests__/            # Test files
│   └── index.ts              # Application entry point
├── aws/                      # AWS deployment configuration files
├── dist/                     # Compiled JavaScript output
├── logs/                     # Application log files
├── .env.example              # Example environment variables template
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier code formatting rules
├── docker-compose.yml        # Docker Compose service definitions
├── Dockerfile                # Multi-stage Docker build configuration
├── .dockerignore             # Files excluded from Docker context
├── jest.config.js            # Jest testing framework configuration
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript compiler configuration
└── README.md                 # Project documentation
```

## 🧪 Testing

The project includes a comprehensive testing setup using Jest:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode during development
npm test -- --watch
```

The testing framework supports:

- Unit tests for individual functions and components
- Integration tests for API endpoints
- Mock services for external dependencies
- Code coverage reporting

## 🚢 Deployment

### 🐳 Docker Deployment

For production deployment using Docker:

1. **Build the production image:**

```bash
npm run docker:prod:build
```

2. **Run the production container:**

```bash
npm run docker:prod
```

This setup is ideal for deploying to any Docker-compatible hosting service, including:

- Digital Ocean
- Heroku
- Google Cloud Run
- Azure Container Instances

### ☁️ AWS Deployment

The project includes ready-to-use AWS CloudFormation templates for deploying to AWS ECS Fargate:

1. **Package the CloudFormation template:**

```bash
aws cloudformation package \
  --template-file aws/cloudformation.yml \
  --s3-bucket your-deployment-bucket \
  --output-template-file packaged-template.yml
```

2. **Deploy the CloudFormation stack:**

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

The AWS deployment includes:

- Auto-scaling configuration
- Load balancing
- Secure environment variable management
- CloudWatch logging integration
- IAM role configuration

## 🔄 Environment Consistency

This project is meticulously designed to ensure consistency between development and production environments:

1. **🐳 Docker Multi-stage Builds**: The Dockerfile uses multi-stage builds to create optimized images for both development and production while maintaining consistency.

2. **🔐 Environment Variables**: Environment variables are managed consistently across all environments using dotenv.

3. **📂 Volume Mounting**: In development, source code is mounted as a volume for hot-reloading without rebuilding the container.

4. **📦 Dependency Management**: Dependencies are installed consistently in all environments with package.json and yarn.lock/package-lock.json.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

Have questions or suggestions? Feel free to open an issue or reach out to the maintainers.

---

⭐ **Star this repository if you find it useful!** ⭐
