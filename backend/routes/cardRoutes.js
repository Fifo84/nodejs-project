import express from "express";
import addCard from "../controllers/cards/cardsHandlers/addCard.js";
import getAllCards from "../controllers/cards/cardsHandlers/getAllCards.js";
import getOneCard from "../controllers/cards/cardsHandlers/getOneCard.js";
import myCards from "../controllers/cards/cardsHandlers/getMyCards.js";
import editCard from "../controllers/cards/cardsHandlers/editCard.js";
import likeCard from "../controllers/cards/cardsHandlers/likeCard.js";
import deleteCard from "../controllers/cards/cardsHandlers/deleteCard.js";
import { guard } from "../middleware/guard.js";
import editBizNumber from "../controllers/cards/cardsHandlers/editBizNumber.js";

const cardRouter = express.Router();

cardRouter.get("/", getAllCards);
cardRouter.get("/my-cards", guard, myCards);
cardRouter.get("/:id", getOneCard);
cardRouter.post("/", guard, addCard);
cardRouter.put("/:id", guard, editCard);
cardRouter.patch("/:id", guard, likeCard);
cardRouter.delete("/:id", guard, deleteCard);
cardRouter.patch("/edit-biznumber/:id", guard, editBizNumber);

export default cardRouter;
