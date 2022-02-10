import Fastify from 'fastify';

import './config.js';
import routes from './src/routes/index.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(routes);

fastify.listen(3000, '0.0.0.0', (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
