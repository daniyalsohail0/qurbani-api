import { Router } from "express";
import {
  createAssignment,
  deleteAssignment,
  readAssignment,
  readAssignments,
  updateAssignment,
} from "../controllers/assignment";
import authorization from "../middleware/authorization";

const assignmentRouter = Router();

assignmentRouter.post(
  "/assignment",
  authorization(["admin"]),
  createAssignment
);

assignmentRouter.get("/assignment", readAssignments);

assignmentRouter.get("/assignment/:id", readAssignment);

assignmentRouter.put(
  "/assignment/:id",
  updateAssignment
);

assignmentRouter.delete(
  "/assignment/:id",
  authorization(["admin"]),
  deleteAssignment
);

export default assignmentRouter;
