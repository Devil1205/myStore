const { Queue } = require("bullmq");
const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

const queue = new Queue("email-notification", { connection: redis });

const sendEmailToQueue = async (emailType, emailData) => {
  try {
    await queue.add(emailType, emailData);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { sendEmailToQueue };
