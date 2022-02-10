import { createReadStream } from 'fs';
import { Transform, Writable } from 'stream';
import { load } from 'js-yaml';
import fetch from 'node-fetch';
import _ from 'lodash';

const CHECK_API_URI =
  process.env.CHECK_API_URI || 'http://localhost:3000/v1/check-definitions';

const { get, values } = _;

const splitObjects = new Transform({
  objectMode: true,
  transform(chunk) {
    values(get(load(chunk), 'checkDefinitions')).forEach((checkDefinition) => {
      this.push(checkDefinition);
    });
  },
});

const sendData = new Writable({
  objectMode: true,
  async write(chunk, _encoding, callback) {
    try {
      const response = await fetch(CHECK_API_URI, {
        method: 'POST',
        body: JSON.stringify(chunk),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.text();
        console.log(`Created check definition id: ${data}`);
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.debug(error);
      console.log(`Error ${error}`);
    } finally {
      callback();
    }
  },
});

createReadStream('./assets/check-definitions.yml')
  .pipe(splitObjects)
  .pipe(sendData);
