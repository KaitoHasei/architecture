require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(bodyParser.json());

app.post("/api/v1/users/:userId/products", async (req, res) => {
  const { userId = "" } = req.params;
  const { productName = "" } = req.body;

  try {
    if (!userId.trim() || !productName.trim()) throw { code: "bad-request" };

    const product = await prisma.product.create({
      data: {
        userId,
        productName,
      },
    });

    return res.status(201).json({ product });
  } catch (error) {
    const { code } = error;

    if ("bad-request") return res.status(400).json({ error: { code } });

    return res.status(500).json({ error: { code: "something went wrong!" } });
  }
});

app.get("/api/v1/users/:userId/products", async (req, res) => {
  const { userId = "" } = req.params;

  try {
    if (!userId.trim()) throw { code: "bad-request" };

    const productByUser = await prisma.product.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json({ productByUser });
  } catch (error) {
    const { code } = error;

    if ("bad-request") return res.status(400).json({ error: { code } });

    return res.status(500).json({ error: { code: "something went wrong!" } });
  }
});

app.listen(8081, () =>
  console.log("Server is running on: http://localhost:8081/")
);
