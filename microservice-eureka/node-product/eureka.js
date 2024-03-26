require("dotenv").config();

const { Eureka } = require("eureka-js-client");

exports.registerEureka = (appName, port) => {
  const client = new Eureka({
    instance: {
      app: appName,
      hostName: process.env.HOST,
      ipAddr: process.env.IP_ADDRESS,
      port: {
        $: port,
        "@enabled": true,
      },
      vipAddress: process.env.EUREKA_HOST,
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn",
      },
    },
    eureka: {
      host: process.env.EUREKA_HOST,
      port: process.env.EUREKA_PORT,
      maxRetries: 10,
      requestRetryDelay: 2000,
    },
  });

  client.logger.level("debug");

  client.start((error) => {
    console.log(error || "user service registered");
  });
};
