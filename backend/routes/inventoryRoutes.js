const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
    createInventoryController,
    getInventoryController,
    getDonorsController,
    getHospitalController,
    getOrganizationController,
    getOrganizationForHospitalController,
    getInventoryHospitalController, getRecentInventoryController,
} = require("../controllers/inventoryController");
const router = express.Router();

//routes
//ADD INVENTORY || POST
router.post('/create-inventory', authMiddleware, createInventoryController);

//GET RECENT BLOOD RECORDS
router.get('/get-recent-inventory', authMiddleware, getRecentInventoryController);

//GET ALL BLOOD RECORDS
router.get('/get-inventory', authMiddleware, getInventoryController);

//GET Hospital BLOOD RECORDS
router.post('/get-inventory-hospital', authMiddleware, getInventoryHospitalController);

//GET Donor RECORDS
router.get('/get-donors', authMiddleware, getDonorsController)

//GET HOSPITAL RECORDS
router.get('/get-hospital', authMiddleware, getHospitalController)

//GET OrganizationPage RECORDS
router.get('/get-organization', authMiddleware, getOrganizationController)

//GET OrganizationPage RECORDS
router.get('/get-organization-for-hospital', authMiddleware, getOrganizationForHospitalController)

module.exports = router;
