import Joi from 'joi';

const { object, number, boolean, string, alternatives } = Joi.types();

export const insertCheckDefinitionsValidator = object.keys({
  frequency: number.min(10000).max(86400000).required(),
  activated: boolean.required(),
  name: string.required(),
  checkType: string.valid('api', 'browser').required(),
  script: alternatives.conditional('checkType', {
    is: 'browser',
    then: string.required(),
  }),
  requestUrl: string.required(),
  requestMethod: alternatives.conditional('checkType', {
    is: 'api',
    then: string.valid('GET', 'POST', 'DELETE', 'PUT').required(),
  }),
});

export const updateCheckDefinitionsValidator = object.keys({
  frequency: number.min(10000).max(86400000),
  activated: boolean,
  name: string,
  checkType: string.valid('api', 'browser'),
  script: alternatives.conditional('checkType', {
    is: 'browser',
    then: string,
  }),
  requestUrl: string,
  requestMethod: alternatives.conditional('checkType', {
    is: 'api',
    then: string.valid('GET', 'POST', 'DELETE', 'PUT'),
  }),
});
