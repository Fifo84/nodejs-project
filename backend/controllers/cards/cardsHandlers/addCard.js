import chalk from "chalk";
import { cardValid } from "../../../utils/validation/cards.validation/cardValidation.js";
import { Card } from "../schemas/cards.model.js";
import { getTokenParams } from "../../../utils/getTokenParams.js";

export const createBizNumber = async (next) => {
  try {
    const min = 1000000;
    const max = 9999999;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    const card = await Card.findOne({ bizNumber: random });
    if (card) return createBizNumber();
    return random;
  } catch (error) {
    return next(error);
  }
};

const addCard = async (req, res, next) => {
  try {
    const cardForm = req.body;
    const { isBusiness, userId } = getTokenParams(req, res);

    const addCardValidation = cardValid.validate(cardForm, {
      abortEarly: false,
    });

    if (addCardValidation.error) {
      const addCardErrors = addCardValidation.error.details.map(
        (err) => err.message
      );
      const error = new Error(addCardErrors);
      error.statusCode = 400;
      error.errorsArray = addCardErrors;
      console.log(chalk.bgRed(addCardErrors));
      return next(error);
    }

    if (!isBusiness) {
      const error = new Error("User is not a business user!");
      error.statusCode = 403;
      return next(error);
    }
    cardForm.user_id = userId;

    cardForm.bizNumber = await createBizNumber();

    const card = new Card({
      ...cardForm,
    });
    const newCard = await card.save();
    res
      .status(201)
      .json({ message: "Card created successfully", card: newCard });
  } catch (error) {
    return next(error);
  }
};

export default addCard;
