import { Card } from "../schemas/cards.model.js";

const getAllCards = async (req, res, next) => {
  try {
    const cards = await Card.find();

    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
};

export default getAllCards;
