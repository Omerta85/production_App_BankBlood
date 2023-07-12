const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {bloodGroupDetailsController} = require("../controllers/analyticsController");
const router = express.Router();

//routes
//GET Blood data
router.get('/bloodGroups-data', authMiddleware, bloodGroupDetailsController)


module.exports = router;
