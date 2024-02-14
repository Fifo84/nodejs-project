import mongoose from "mongoose";
import { Card } from "../schemas/cards.model.js";

const getOneCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid ID format");
      error.statusCode = 400;
      return next(error);
    }
    const card = await Card.findById(id);

    if (!card) {
      const error = new Error("Card not found");
      error.statusCode = 404;
      next(error);
      return;
    }

    res.status(200).json({ card: card });
  } catch (error) {
    next(error);
  }
};

export default getOneCard;
