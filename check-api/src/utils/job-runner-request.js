import fetch from 'node-fetch';
import jobRunnerPayloadBuilder from './job-runner-payload-builder.js';

const JOB_RUNNER_URI =
  process.env.JOB_RUNNER_URI || 'http://localhost:3001/v1/job';

export default (data, method) =>
  fetch(JOB_RUNNER_URI, {
    method: method,
    body: JSON.stringify(jobRunnerPayloadBuilder(data)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
