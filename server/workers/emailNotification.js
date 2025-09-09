const Redis = require("ioredis");
const { Worker } = require("bullmq");
const sendEmail = require("../utils/sendEmail");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "email-notification",
  async (job) => {
    try {
      const { email, subject, message } = job.data;
      await sendEmail({ email, subject, message });
    } catch (error) {
      console.log(error);
    }
  },
  {
    connection: redis,
  }
);

worker.on("completed", (job) => {
    console.log(`Email sent to ${job.data.email} successfully`);
});
