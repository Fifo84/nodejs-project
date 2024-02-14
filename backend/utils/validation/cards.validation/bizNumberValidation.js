import Joi from "joi";

export const bizNumberSchema = Joi.object({
  bizNumber: Joi.number()
    .integer()
    .min(10 ** 6)
    .rule({
      message: "bizNumber must have 7 digits and no less then 1000000",
    })
    .max(10 ** 7 - 1)
    .rule({
      message: "bizNumber must have 7 digits ans not more then 9999999",
    }),
});
