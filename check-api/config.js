import { Model } from 'objection';
import Knex from 'knex';

const pgConnectionString =
  process.env.PG_CONNECTION_STRING ||
  'postgresql://check:check@localhost:5432/check';

const pg = Knex({
  client: 'pg',
  connection: pgConnectionString,
  searchPath: ['app'],
});

Model.knex(pg);
