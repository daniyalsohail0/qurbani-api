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

dotenv.config();

async function main() {
  const app = express();
  const port = process.env.PORT || 8080;

  await mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Connected to database."))
    .catch((e) => console.error(e));

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://qurbani-2025.vercel.app",
        "https://alkhairqurbani.org",
        "https://www.alkhairqurbani.org",
      ],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(express.json()); // ✅ Correct placement

  app.use("/v1", authRouter);
  app.use("/v1", userRouter);
  app.use("/v1", assignmentRouter);
  app.use("/v1", customerRouter);

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}

main();
