import EntityNotFoundError from '../errors/EntityNotFoundError.js';
import InputValidationError from '../errors/InputValidationError.js';
import {
  insert,
  patch,
  getAll,
  getById,
  destroy,
} from '../repositories/check-definitions.js';
import { destroyAllByCheckDefinitionId } from '../repositories/checks.js';
import jobRunnerRequest from '../utils/job-runner-request.js';
import {
  insertCheckDefinitionsValidator,
  updateCheckDefinitionsValidator,
} from '../validators/check-definitions.js';

export const getAllCheckDefinitions = async () => getAll();

export const getCheckDefinitionById = async (id) => {
  const data = await getById(id);

  if (!data) {
    throw new EntityNotFoundError();
  }

  return data;
};

export const insertCheckDefinition = async (payload) => {
  const { error, value } = insertCheckDefinitionsValidator.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw new InputValidationError(error.details);
  }

  const data = await insert(value);

  if (data.activated) {
    const response = await jobRunnerRequest(data, 'POST');

    if (!response.ok) {
      console.log(response);

      throw new Error('Error while trying to create new job entry.');
    }
  }

  return data.id;
};

export const patchCheckDefinition = async (id, payload) => {
  const { error, value } = updateCheckDefinitionsValidator.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw new InputValidationError(error.details);
  }

  const data = await patch(id, value);

  if (!data) {
    throw new EntityNotFoundError();
  }

  const method = data.activated ? 'POST' : 'DELETE';

  const response = await jobRunnerRequest(data, method);
  if (!response.ok) {
    console.log(response);

    throw new Error('Error while trying to update job entry.');
  }

  return data;
};

export const deleteCheckDefinition = async (id) => {
  await destroyAllByCheckDefinitionId(id);

  const data = await destroy(id);

  if (!data) {
    throw new EntityNotFoundError();
  }

  const response = await jobRunnerRequest(data, 'DELETE');

  if (!response.ok) {
    console.log(response);

    throw new Error('Error while trying to delete job entry.');
  }
};
