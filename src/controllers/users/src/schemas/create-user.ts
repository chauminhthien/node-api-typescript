import * as Joi from "joi";

export const UserCreate = Joi.object({
  email: Joi.string(),
  fullname: Joi.string().required()
});
