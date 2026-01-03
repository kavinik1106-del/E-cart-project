import express from "express";
import {
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
} from "../controllers/adminCustomer.controller.js";

const router = express.Router();

router.get("/all", getAllCustomers);           // Admin - all customers
router.get("/:id", getCustomerById);        // Admin - single customer
router.delete("/:id", deleteCustomer);      // Admin - delete customer

export default router;
