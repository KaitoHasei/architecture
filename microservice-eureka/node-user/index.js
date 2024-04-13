require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const kafka = require("kafka-node");
const { registerEureka } = require("./eureka");
const redis = require("redis");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
let redisClient;
(async () => {
  redisClient = await redis
    .createClient()
    .on("error", (err) => console.log("redis client error:", err))
    .connect();
})();

app.use(bodyParser.json());

// const client = new kafka.KafkaClient("localhost:2181");
// const producer = new kafka.Producer(client);

// producer.on("ready", () => console.log("Kafka is ready!"));
// producer.on("error", () => console.log("Kafka is error!"));

app.post("/api/v1/users", async (req, res) => {
  const { username = "" } = req.body;

  try {
    if (!username.trim()) throw { code: "bad-request" };

    const user = await prisma.user.create({
      data: {
        username,
      },
    });

    return res.status(201).json({ user });
  } catch (error) {
    const { code } = error;

    if ("bad-request") return res.status(400).json({ error: { code } });

    return res.status(500).json({ error: { code: "something went wrong!" } });
  }
});

app.get("/api/v1/users/:userId/products", async (req, res) => {
  const { userId } = req.params;

  let result;
  let isCached = false;

  try {
    if (!userId.trim()) throw { code: "bad-request" };

    const userProductFromCache = await redisClient.get(userId);
    console.log(userProductFromCache);

    if (userProductFromCache) {
      isCached = true;
      result = JSON.parse(userProductFromCache);
    } else {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      const response = await fetch(
        `${process.env.PRODUCT_SERVICE}/users/${userId}/products`
      );
      const data = await response.json();
      const products = data?.productByUser;

      result = { user, products };
      redisClient.set(userId, JSON.stringify(result));
    }

    return res.status(200).json({ fromCache: isCached, result });
  } catch (error) {
    const { code } = error;
    console.log(error);

    if ("bad-request") return res.status(400).json({ error: { code } });

    return res.status(500).json({ error: { code: "something went wrong!" } });
  }
});

app.listen(8080, () =>
  console.log("Server is running on: http://localhost:8080/")
);

registerEureka("user-service", 8080);
