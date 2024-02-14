import express from "express";
import chalk from "chalk";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import cardRouter from "./routes/cardRoutes.js";
import { dotenvVariables } from "./config/dotenvService.js";
import errorHandler from "./middleware/errorHandler.js";
import path from "path";
import {
  initialCardsStart,
  initialUsersStart,
} from "./data/initial-data.service.js";
import { morganMiddleware } from "./middleware/logger.js";

const __dirname = path.resolve();
const { PORT, REMOTE_URL } = dotenvVariables;

async function main() {
  await mongoose.connect(REMOTE_URL);
  console.log("mongodb connection established on port 27017");
  await initialUsersStart();
  await initialCardsStart();
}
main().catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Accept,Authorization",
  })
);

app.listen(PORT || 5000, () => {
  console.log(chalk.blue(`listening on port: ${PORT}`));
});

app.get("/", (req, res) => {
  res.send("Hello");
  console.log(
    chalk.blue.underline.bold("Hello this is Ofir Aaronson's nodejs project")
  );
});
app.use(morganMiddleware);

app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use("*", (req, res) => {
  res.status(404).sendFile(`${__dirname}/public/index.html`);
});
app.use(errorHandler);
