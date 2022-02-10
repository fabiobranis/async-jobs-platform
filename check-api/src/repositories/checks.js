import Checks from '../models/checks.js';

export const getAllByCheckDefinitionId = (checkDefinitionId) =>
  Checks.query().where('check_definition_id', checkDefinitionId);

export const getById = (id) => Checks.query().findById(id);

export const insert = (check) => Checks.query().insert(check);

export const destroy = (id) => Checks.query().deleteById(id);

export const destroyAllByCheckDefinitionId = (checkDefinitionId) =>
  Checks.query().delete().where('check_definition_id', checkDefinitionId);
