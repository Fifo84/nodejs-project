import { getTokenParams } from "../../../utils/getTokenParams.js";
import { Card } from "../schemas/cards.model.js";

const myCards = async (req, res, next) => {
  try {
    const { userId } = getTokenParams(req, res);

    const cards = await Card.find({ user_id: userId });

    if (!cards.length) {
      return res.status(200).json({ cards: cards });
    }
    res.json(cards);
  } catch (error) {
    next(error);
  }
};

export default myCards;
