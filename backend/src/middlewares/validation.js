const Joi = require('joi');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error('string.uri');
};

const url = Joi.string().required().custom(validateURL);

module.exports = {
  url,
};
