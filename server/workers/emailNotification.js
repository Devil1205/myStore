const { Worker } = require("bullmq");
const sendEmail = require("../utils/sendEmail");

const redis = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
};

const worker = new Worker(
  "email-notification",
  async (job) => {
    const { email, subject, message } = job.data;
    await sendEmail({ email, subject, message });
  },
  {
    connection: redis,
    concurrency: 5,
  }
);

worker.on("completed", (job) => {
  console.log(`Email sent to ${job.data.email} successfully`);
});
