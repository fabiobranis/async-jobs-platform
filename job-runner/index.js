import Fastify from 'fastify';

import routes from './src/routes.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(routes);

fastify.listen(3001, '0.0.0.0', (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
