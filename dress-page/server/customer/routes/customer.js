// backend/routes/customer.js
import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM customers");
    res.json({ success: true, data: rows }); // ✅ must match frontend expectation
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Cannot fetch customers" });
  }
});

export default router;
