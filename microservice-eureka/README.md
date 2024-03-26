<h1 style="text-align: center;">Microservice with Eureka and API Gateway</h1>

## Getting Started

Run development server.

Move into each project and go through the steps.

**Step 1:**

- eureka-service and gateway-service: install dependencies

- node-user and node product:

  ```bash
  npm install
  npx prisma generate
  ```

**Step 2:**

Add file `.env` and set up environment

- node-user: DATABASE_URL, PRODUCT_SERVICE
- node-product: DATABASE_URL

**Step 3:**

Run server:

- eureka-service and gateway-service run with tool code

- node-user and node-product run with command:

  ```bash
  npm run dev
  ```

Server eureka-service will run on port: 8761

Server gateway-service will run on port: 8762

Server node-user will run on port: 8080

Server node-product run on port: 8081

## Preview
