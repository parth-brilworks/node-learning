const Joi = require("joi");

const authorSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required().min(3).max(100),
  biography: Joi.string().optional().allow(""),
});

const bookSchema = Joi.object({
  id: Joi.number().optional(),
  title: Joi.string().required().min(3).max(150),
  authorId: Joi.number().required(),
  categoryId: Joi.number().required(),
  publicationYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
});

const categorySchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required().min(3).max(50),
  description: Joi.string().optional().allow(""),
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorDetails = error.details.map((detail) => detail.message);
      res.status(400).json({
        status: "error",
        message: "Validation error",
        details: errorDetails,
      });
    } else {
      next();
    }
  };
};

module.exports = {
  authorSchema,
  bookSchema,
  categorySchema,
  validate,
};
