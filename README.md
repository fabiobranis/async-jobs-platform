# Check platform

This is a platform which allows you to register scheduled checks and monitor the checks through the database.

## How to execute this

You just need to run docker compose up and wait.
Then you need to `cd check-seeder` and run `npm run seed` in order to seed the data. You'll have all the id's to use on the tests in the console, after the seed process.

## Structure

- Check API - The API to register the checks definitions
- Job Runner API - The API to register the producers (queue scheduled jobs)
- Job Runner Spawner - The script that consumes the scheduled jobs
- Check Seeder - A script to seed the check definitions database

## About the architecture

I choose to use the producer/consumer pattern to illustrate a design choice which I really like. Here, basically I have a redis instance to hold the scheduled jobs and the bull library to produce and consume the jobs.

Regarding the database, I'm showing here in this project the way that I think about structured data.

The repository is a monorepo, but well divided (we don't have any global/shared package). In fact, I would prefer to have specific repo for each job, but for the sake of simplicity I've made everything here.

In the seeder I've used a technique which I really love, streams. In this module, basically I've made a pipeline where I parse the yaml file to a json based in the provided collection, and them in the writable stream, I send the content as a request to the check API.

The both API's are based on fastify, a micro framework which have a similar approach to express js.

## Tests

In this repo I just made one test to illustrate unit tests.
Because the lack of time I was unable to do other tests and to create end to end tests. But, for instance I think it would be nice to explain how I think a good approach to do this kind of test is using test containers. It's because using test containers you should be able to simulate the complete environment, so it's possible to raise a database container and seed the data and them execute the proper testing doing the assertions for the expected results.

## Check API

This is a fastify API which uses Objection as a query builder interface for postgresql.

The available entities of this API are:

CheckDefinition

```json
{
  "name": "String",
  "frequency": "Integer from 10000 to 86400000",
  "activated": "Boolean",
  "checkType": "String api|browser",
  "requestMethod": "String GET|PUT|POST|DELETE",
  "requestUrl": "String",
  "script": "String"
}
```

Check

```json
{
  "successful": "Boolean"
}
```

In this API I'm exposing the following endpoints:

- GET /check-definitions

This is the basic endpoint to list all check definitions. Returns a collection of CheckDefinitions.

- GET /check-definitions/{id}

This is the endpoint to fetch a specific check definition. Return a single CheckDefinition.

- POST /check-definitions

This is the endpoint to insert a new check definition. Should receive a CheckDefinition.

- PATCH /check-definitions

This is the endpoint to update part of a check definition, can be used to activate or deactivate a job. Should receive a partial CheckDefinition.

- DELETE /check-definitions

This is the endpoint to delete the check definition.

The check definition model have a property checkType, which defines if it's related to an API call or a browser check.

When the checkType is equal to api, the requestMethod property is required.
When the checkType is equal to Browser, then the script property is required.

- POST - /check-definitions/{check-definition -id}/check

This is the endpoint to insert a check. It's exposed for the job runner to send the check result. The idea is to prevent other services to access the database. The data must be the Check entity.

- GET - /check-definitions/{check-definition-id}/check/

This is the endpoint to list the checks for a given check definition.

- GET - /check-definitions/{check-definition-id}/check/{check-id}

This is the endpoint to get a check information.

## Job Runner API

This API exposes an interface to register and remove producers for scheduled jobs.

The only entity exposed is:

```json
{
  "id": "String| The unique id for the job",
  "frequency": "Number| The job recurrence time",
  "...": "The rest of the object will be used to send as arguments for the job consumer"
}
```

The endpoints are:

- POST - /job

Add a new producer to be consumed

- DELETE - /job

Remove the producer. It should have the same payload as the POST endpoint because of the bull's requirements.
