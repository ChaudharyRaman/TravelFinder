import Joi from "joi";

const register = Joi.object({
  name: Joi.string().required().max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  userPreferences: Joi.object({
    budget: Joi.number(),
    interests: Joi.array().items(Joi.string()),
    location: Joi.string(),
    duration: Joi.number(),
  }),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const preferences = Joi.object({
  budget: Joi.number(),
  interests: Joi.array().items(Joi.string()),
  location: Joi.array().items(Joi.string()),
  duration: Joi.number(),
});

export default { register, login, preferences };
