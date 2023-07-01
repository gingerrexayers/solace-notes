import * as Joi from 'joi';

export const schema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
  PORT: Joi.number().default(3000),
  POSTGRES_HOST: Joi.string().default('database'),
  POSTGRES_PORT: Joi.string().default(5432),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
});
