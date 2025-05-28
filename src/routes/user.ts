import Router from "express";
import {
  deleteUser,
  readUser,
  readUsers,
  registerUser,
  updateUser,
} from "../controllers/user";
import authorization from "../middleware/authorization";

const userRouter = Router();

userRouter.post("/user", authorization(["admin"]), registerUser);

userRouter.get("/user", authorization(["admin"]), readUsers);

userRouter.get("/user/:id", authorization(["admin", "user"]), readUser);

userRouter.put("/user/:id", authorization(["admin", "user"]), updateUser);

userRouter.delete("/user/:id", authorization(["admin", "user"]), deleteUser);

export default userRouter;
