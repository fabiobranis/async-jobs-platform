import EntityNotFoundError from '../errors/EntityNotFoundError.js';
import InputValidationError from '../errors/InputValidationError.js';
import {
  getCheckById,
  insertCheck,
  getAllChecksByCheckDefinitionId,
  deleteCheck,
} from '../services/checks.js';

const checkRoutes = async (fastify) => {
  fastify.get('/', async (request, response) => {
    const data = await getAllChecksByCheckDefinitionId(
      request.params.checkDefinitionId
    );

    return response.send(data);
  });

  fastify.get('/:id', async (request, response) => {
    try {
      const data = await getCheckById(request.params.id);

      return response.send(data);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return response.status(404).send();
      }

      return response.status(400).send();
    }
  });

  fastify.post('/', async (request, response) => {
    try {
      const data = await insertCheck(
        request.params.checkDefinitionId,
        request.body
      );

      return response.code(201).send(data);
    } catch (error) {
      if (error instanceof InputValidationError) {
        return response.status(422).send(error.getDetails());
      }

      return response.status(400).send();
    }
  });

  fastify.delete('/:id', async (request, response) => {
    try {
      await deleteCheck(request.params.id);

      return response.code(200).send();
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return response.status(404).send();
      }

      return response.status(400).send();
    }
  });
};

export default checkRoutes;
