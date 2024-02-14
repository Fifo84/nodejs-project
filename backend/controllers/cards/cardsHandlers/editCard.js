import { Card } from "../schemas/cards.model.js";
import { getTokenParams } from "../../../utils/getTokenParams.js";
import { cardValid } from "../../../utils/validation/cards.validation/cardValidation.js";
import mongoose from "mongoose";

const editCard = async (req, res, next) => {
  try {
    const editCardForm = req.body;
    const { id } = req.params;

    const editCardValidation = cardValid.validate(editCardForm, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (editCardValidation.error) {
      const editCardErrors = editCardValidation.error.details.map(
        (err) => err.message
      );
      const error = new Error(editCardErrors);
      error.statusCode = 400;
      error.errorsArray = editCardErrors;
      return next(error);
    }

    const { userId } = getTokenParams(req, res);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid ID format");
      error.statusCode = 400;
      return next(error);
    }

    const card = await Card.findById(id);

    if (!card) {
      const error = new Error("Card not found");
      error.statusCode = 404;
      return next(error);
    }
    if (card.user_id != userId) {
      const error = new Error("User not authorized to edit this card");
      error.statusCode = 403;
      return next(error);
    }

    card.set(editCardForm);

    const updatedCard = await card.save();

    res.json(updatedCard);
  } catch (error) {
    next(error);
    return;
  }
};

export default editCard;
