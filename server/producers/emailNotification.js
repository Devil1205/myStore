const { Queue } = require("bullmq");

const redis = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
};

const queue = new Queue("email-notification", { connection: redis });

const sendEmailToQueue = async (emailType, emailData) => {
  try {
    await queue.add(emailType, emailData, {
      attemps: 3,
      backoff: {
        type: "exponential",
        delay: 10000,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { sendEmailToQueue };
