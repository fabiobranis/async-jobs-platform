import CheckDefinitions from '../models/check-definitions.js';

export const getAll = () => CheckDefinitions.query();

export const getById = (id) => CheckDefinitions.query().findById(id);

export const insert = (checkDefinitions) =>
  CheckDefinitions.query().insert(checkDefinitions);

export const destroy = (id) =>
  CheckDefinitions.query().deleteById(id).returning('*');

export const patch = (id, partialCheckDefinitions) =>
  CheckDefinitions.query()
    .findById(id)
    .patch(partialCheckDefinitions)
    .returning('*');
