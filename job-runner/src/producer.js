import Queue from 'bull';
import constants from './constants.js';

const REDIS_CONNECTION_STRING =
  process.env.REDIS_CONNECTION_STRING || 'redis://127.0.0.1:6379';

const { QUEUE_NAME } = constants;

const queue = new Queue(QUEUE_NAME, REDIS_CONNECTION_STRING);

export const add = (id, payload, options) => queue.add(id, payload, options);

export const remove = (id, options) => queue.removeRepeatable(id, options);
