import { Model, snakeCaseMappers } from 'objection';

export default class CheckDefinitions extends Model {
  static get tableName() {
    return 'check_definitions';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}
