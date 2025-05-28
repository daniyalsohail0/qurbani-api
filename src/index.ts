import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import assignmentRouter from "./routes/assignment";
import customerRouter from "./routes/customer";
import orderRouter from "./routes/order";

dotenv.config();

async function main() {
  const app = express();

  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });

  await mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Connected to database."))
    .catch((e) => console.error(e));

  app.use(cors());
  app.use(cookieParser());
  app.use(morgan("dev"));

  app.use("/api", express.json());
  app.use("/api", authRouter);
  app.use("/api", userRouter);
  app.use("/api", assignmentRouter);
  app.use("/api", customerRouter);
  app.use("/api", orderRouter);
}

main();
