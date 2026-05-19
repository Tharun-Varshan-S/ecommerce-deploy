const express = require("express");
const { getAllOrders, getAllUsers } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, admin);

router.get("/orders", getAllOrders);
router.get("/users", getAllUsers);

module.exports = router;
