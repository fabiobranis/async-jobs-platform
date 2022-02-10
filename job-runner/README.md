# Job Runner

Job runner have two parts:

- API - Which is the api exposed to register or remove producer jobs
- Spawner - The script that spawns the consumer job

## Scripts

This application depends on a local redis instance (can be run inside a docker container).

- To start the API you just need to run `npm start`.

- To spawn the consumer you just need to run `npm run spawn`.
