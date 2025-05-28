import Router from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers/customer";
import authorization from "../middleware/authorization";

const customerRouter = Router();

customerRouter.post("/customer", authorization(["admin"]), createCustomer);

customerRouter.get("/customer", getCustomers);

customerRouter.get("/customer/:id", getCustomerById);

customerRouter.put("/customer/:id", authorization(["admin"]), updateCustomer);

customerRouter.delete(
  "/customer/:id",
  authorization(["admin"]),
  deleteCustomer
);

export default customerRouter;
