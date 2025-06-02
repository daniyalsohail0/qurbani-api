import { Router } from "express";
import { login, logout, refresh } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.get("/refresh", refresh);

authRouter.post("/logout", logout);

export default authRouter;
