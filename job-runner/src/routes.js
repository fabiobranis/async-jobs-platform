import { add, remove } from './producer.js';

const routes = async (fastify) => {
  fastify.post('/', async (request, response) => {
    const { id, frequency, ...rest } = request.body;
    try {
      await add(id, rest, {
        repeat: { every: frequency },
      });
      return response.status(201).send();
    } catch (error) {
      console.log(error);
      return response.status(500);
    }
  });

  fastify.delete('/', async (request, response) => {
    const { id, frequency } = request.body;
    try {
      await remove(id, { every: frequency });
      return response.status(200).send();
    } catch (error) {
      console.log(error);
      return response.status(500);
    }
  });
};

export default async (fastify) => {
  fastify.register(routes, { prefix: '/v1/job' });
};
