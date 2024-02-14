import mongoose from "mongoose";
import { getTokenParams } from "../../../utils/getTokenParams.js";
import { Card } from "../schemas/cards.model.js";

const likeCard = async (req, res, next) => {
  try {
    const { userId } = getTokenParams(req, res);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid ID format");
      error.statusCode = 400;
      return next(error);
    }

    let card = await Card.findOne({ _id: id });

    if (!card) {
      const error = new Error("Card not found");
      error.statusCode = 404;
      return next(error);
    }

    if (card.like.includes(userId)) {
      card = await Card.findOneAndUpdate(
        { _id: id },
        { $pull: { like: userId } },
        { new: true }
      );
    } else {
      card = await Card.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { like: userId } },
        { new: true }
      );
    }
    res
      .status(200)
      .json({ message: "Card like status updated successfully", card: card });
  } catch (error) {
    next(error);
  }
};

export default likeCard;
