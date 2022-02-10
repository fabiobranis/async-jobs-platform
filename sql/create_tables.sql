CREATE SCHEMA app;

SET search_path TO app;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE HTTP_METHOD as ENUM ('GET', 'POST', 'PUT','DELETE');
CREATE TYPE CHECK_DEFINITION_TYPE as ENUM ('api', 'browser');

CREATE TABLE IF NOT EXISTS check_definitions (
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(250) NOT NULL,
  frequency INTEGER NOT NULL,
  activated BOOLEAN NOT NULL,
  check_type CHECK_DEFINITION_TYPE NOT NULL,
  request_method HTTP_METHOD,
  request_url TEXT,
  script TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS checks (
  id UUID DEFAULT uuid_generate_v4(),
  check_definition_id UUID NOT NULL,
  processing_time TIMESTAMP NOT NULL DEFAULT NOW(),
  successful BOOLEAN NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_check_definitions 
    FOREIGN KEY(check_definition_id) 
      REFERENCES check_definitions(id)
);