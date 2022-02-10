import Joi from 'joi';

const { object, boolean } = Joi.types();

export default object.keys({
  successful: boolean.required(),
});
