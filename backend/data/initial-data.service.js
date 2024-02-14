import chalk from "chalk";
import { createBizNumber } from "../controllers/cards/cardsHandlers/addCard.js";
import { Card } from "../controllers/cards/schemas/cards.model.js";
import { User } from "../controllers/users/schemas/user.model.js";
import { users, cards } from "./initialData.js";
import bcrypt from "bcrypt";

const usersId = [];
export const initialUsersStart = async () => {
  try {
    const userAmount = await User.find().countDocuments();
    if (userAmount === 0) {
      for (const singleUser of users) {
        const { password } = singleUser;
        const newUser = await User({
          ...singleUser,
          password: await bcrypt.hash(password, 10),
        });
        const obj = await newUser.save();
        if (obj.isBusiness) {
          usersId.push(obj._id);
        }
      }
      console.log(chalk.bgGreen.black("initial users created"));
    }
  } catch (error) {
    console.log(error);
  }
};

export const initialCardsStart = async () => {
  try {
    const cardAmount = await Card.find().countDocuments();
    if (cardAmount === 0) {
      for (const singleCard of cards) {
        singleCard.bizNumber = await createBizNumber();
        const randomUserIndex = Math.floor(Math.random() * usersId.length);
        singleCard.user_id = usersId[randomUserIndex];
        const newCard = new Card(singleCard);
        await newCard.save();
      }
      console.log(chalk.bgGreen.black("initial cards created"));
    }
  } catch (error) {
    console.log(error);
  }
};
