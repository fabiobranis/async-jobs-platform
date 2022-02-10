import EntityNotFoundError from '../errors/EntityNotFoundError.js';
import InputValidationError from '../errors/InputValidationError.js';

import {
  getAllCheckDefinitions,
  getCheckDefinitionById,
  insertCheckDefinition,
  patchCheckDefinition,
  deleteCheckDefinition,
} from '../services/check-definitions.js';

export default async (fastify) => {
  fastify.get('/', async (_request, response) => {
    const data = await getAllCheckDefinitions();

    return response.send(data);
  });

  fastify.get('/:id', async (request, response) => {
    try {
      const data = await getCheckDefinitionById(request.params.id);

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
      const id = await insertCheckDefinition(request.body);
      console.log(id);

      return response.code(201).send({ id });
    } catch (error) {
      if (error instanceof InputValidationError) {
        return response.status(422).send(error.getDetails());
      }
      console.debug(error);
      return response.status(400).send();
    }
  });

  fastify.patch('/:id', async (request, response) => {
    try {
      await patchCheckDefinition(request.params.id, request.body);

      return response.code(200).send();
    } catch (error) {
      if (error instanceof InputValidationError) {
        return response.status(422).send(error.getDetails());
      }

      if (error instanceof EntityNotFoundError) {
        return response.status(404).send();
      }
      console.log(error);
      return response.status(400).send();
    }
  });

  fastify.delete('/:id', async (request, response) => {
    try {
      await deleteCheckDefinition(request.params.id);

      return response.code(200).send();
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return response.status(404).send();
      }

      return response.status(400).send();
    }
  });
};
