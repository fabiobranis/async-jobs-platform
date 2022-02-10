import EntityNotFoundError from '../errors/EntityNotFoundError.js';
import InputValidationError from '../errors/InputValidationError.js';
import {
  getAllByCheckDefinitionId,
  getById,
  insert,
  destroy,
} from '../repositories/checks.js';
import insertCheckValidator from '../validators/check.js';

export const getAllChecksByCheckDefinitionId = async (checkDefinitionId) => {
  const data = await getAllByCheckDefinitionId(checkDefinitionId);

  if (!data) {
    throw new EntityNotFoundError();
  }

  return data;
};

export const getCheckById = async (id) => {
  const data = await getById(id);

  if (!data) {
    throw new EntityNotFoundError();
  }

  return data;
};

export const insertCheck = async (checkDefinitionId, payload) => {
  const { error, value } = insertCheckValidator.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw new InputValidationError(error.details);
  }

  const data = await insert({ ...value, checkDefinitionId });

  return data.id;
};

export const deleteCheck = async (id) => {
  const data = await destroy(id);

  if (data === 0) {
    throw new EntityNotFoundError();
  }
};
