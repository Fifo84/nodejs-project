import mongoose from "mongoose";
import { getTokenParams } from "../../../utils/getTokenParams.js";
import { Card } from "../schemas/cards.model.js";

const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, isAdmin } = getTokenParams(req, res);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid ID format");
      error.statusCode = 400;
      return next(error);
    }

    const card = await Card.findById(id);

    if (card.user_id != userId && !isAdmin) {
      const error = new Error("user not authorized to delete");
      error.statusCode = 403;
      return next(error);
    }

    const deleteCard = await Card.findByIdAndDelete(req.params.id);

    if (!deleteCard) {
      const error = new Error("Card not found");
      error.statusCode = 404;
      return next(error);
    }

    res
      .status(200)
      .json({ message: "Card deleted successfully", card: { deleteCard } });
  } catch (error) {
    return next(error);
  }
};

export default deleteCard;
