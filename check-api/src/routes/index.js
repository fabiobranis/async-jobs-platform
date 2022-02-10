import checkDefinitionRoutes from './check-definitions.js';
import checkRoutes from './checks.js';

export default async (fastify) => {
  fastify.register(checkDefinitionRoutes, { prefix: '/v1/check-definitions' });
  fastify.register(checkRoutes, {
    prefix: '/v1/check-definitions/:checkDefinitionId/check',
  });
};
