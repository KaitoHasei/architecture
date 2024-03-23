<h1 style="text-align: center;">Microservice and Kafka</h1>

## Getting Started

Run development server.

Move into each project and go through the steps.

**Step 1:**

```bash
npm install
npx prisma generate
```

**Step 2:**

Add file `.env` and set up environment
- node-user: DATABASE_URL, PRODUCT_SERVICE
- node-product: DATABASE_URL

**Step 3:**

Run server with command:
```bash
npm run dev
```

Server node-user will run on port: 8080
Server node-product run on port: 8081

## Preview ##

![Screenshot 2024-03-23 114507](https://github.com/KaitoHasei/architecture/assets/81298899/d9c669df-3154-4f33-8d16-7d199f84330f)

![Screenshot 2024-03-23 114520](https://github.com/KaitoHasei/architecture/assets/81298899/29dbf6e6-cf0f-40aa-ad07-6773759d96aa)

![Screenshot 2024-03-23 114532](https://github.com/KaitoHasei/architecture/assets/81298899/1e1e4d89-991e-49fd-8318-0984f19a7ac1)
