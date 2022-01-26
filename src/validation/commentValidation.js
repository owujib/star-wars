const JOI = require('joi');

/**
 * @param {Object} data
 * @returns  error of the validated data
 */
exports.commenValidation = (data) => {
  const schema = JOI.object({
    comment: JOI.string().required().max(500).min(1).messages({
      'any.required': '{{#label}} is required!!',
      'string.empty': "{{#label}} can't be empty!!",
      'string.max': '{{#label}} can not be more than 500 characters',
    }),
  });

  return schema.validate(data);
};
