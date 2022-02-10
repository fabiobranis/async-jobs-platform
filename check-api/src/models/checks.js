import { Model, snakeCaseMappers } from 'objection';

export default class Checks extends Model {
  static get tableName() {
    return 'checks';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}
