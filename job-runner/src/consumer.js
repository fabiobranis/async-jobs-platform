import fetch from 'node-fetch';
import Queue from 'bull';
import constants from './constants.js';

const CHECK_API_URI =
  process.env.CHECK_API_URI || 'http://localhost:3000/v1/check-definitions';

const REDIS_CONNECTION_STRING =
  process.env.REDIS_CONNECTION_STRING || 'redis://127.0.0.1:6379';

const { QUEUE_NAME } = constants;

const queue = new Queue(QUEUE_NAME, REDIS_CONNECTION_STRING);

const runCheck = async () =>
  new Promise((resolve) => {
    if (Math.random() < 0.05) {
      throw Error('check failed');
    }
    setTimeout(() => resolve('ok'), Math.random() * 1000);
  });

export default async () => {
  queue.process('*', async (job, done) => {
    let payload;
    console.log('check!', job.name);
    try {
      await runCheck();
      payload = { successful: true };
    } catch (error) {
      payload = { successful: false };
    }
    await fetch(`${CHECK_API_URI}/${job.name}/check`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    done(null, { done: job.data });
  });
};
