const express = require("express");
const { verifyToken } = require("../middleware");
const router = express.Router();
const {create, getAll, deleteById, updateById} = require('../controllers/noteController')


router.get("/", verifyToken, getAll)
router.post("/", verifyToken, create)
router.delete("/:id", verifyToken, deleteById)
router.put("/:id", verifyToken, updateById)


module.exports = router
