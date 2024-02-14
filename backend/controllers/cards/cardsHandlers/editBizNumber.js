import mongoose from "mongoose";
import { getTokenParams } from "../../../utils/getTokenParams.js";
import { bizNumberSchema } from "../../../utils/validation/cards.validation/bizNumberValidation.js";
import { Card } from "../schemas/cards.model.js";

const editBizNumber = async (req, res, next) => {
  try {
    const { bizNumber } = req.body;
    const cardId = req.params.id;
    const { isAdmin } = getTokenParams(req, res);

    const editValidation = bizNumberSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (editValidation.error) {
      const editErrors = editValidation.error.details.map((err) => err.message);
      const error = new Error(editErrors);
      error.statusCode = 400;
      error.errorsArray = editErrors;
      return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid ID format");
      error.statusCode = 400;
      return next(error);
    }

    if (!isAdmin) {
      const error = new Error("only admin users can change bizNumber");
      error.statusCode = 403;
      return next(error);
    }

    const card = await Card.findById(cardId);
    if (!card) {
      const error = new Error("card not found");
      error.statusCode = 404;
      return next(error);
    }

    const existingCard = await Card.findOne(
      {
        bizNumber: bizNumber,
      },
      { bizNumber: 1, _id: 0 }
    );

    console.log(existingCard);
    if (existingCard) {
      const error = new Error("Biznumber already exists");
      error.statusCode = 409;
      return next(error);
    }
    card.bizNumber = bizNumber;

    await card.save();
    res.status(200).json({ message: "Card bizNumber updated successfully" });
  } catch (error) {
    return next(error);
  }
};

export default editBizNumber;
