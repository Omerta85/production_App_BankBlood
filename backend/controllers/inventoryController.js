// const mongoose = require("mongoose");
const {Types} = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body;
        //validation
        const user = await userModel.findOne({ email });
        if (!user) {
             new Error("User Not Found");
        }

        if (req.body.inventoryType === "out") {
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organisation = new Types.ObjectId(req.body.userId);
            //calculate Blood Quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: "in",
                        bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            // console.log("Total In", totalInOfRequestedBlood);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;
            //calculate OUT Blood Quantity

            const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: "out",
                        bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

            //in & Out Calc
            const availableQuantityOfBloodGroup = totalIn - totalOut;
            //quantity validation
            if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
                });
            }
            req.body.hospital = user?._id;
        } else {
            req.body.donor = user?._id;
        }

        //save record
        const inventory = new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).send({
            success: true,
            message: "New Blood Record Added",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Create Inventory API",
            error,
        });
    }
};

// GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find({
                organisation: req.body.userId,
            })
            .populate("donor")
            .populate("hospital")
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "get all records successfully",
            inventory,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Get All Inventory",
            error,
        });
    }
};
// GET Hospital BLOOD RECORDS
const getInventoryHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find(req.body.filters)
            .populate("donor")
            .populate("hospital")
            .populate("organisation")
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "get hospital consumer records successfully",
            inventory,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Get consumer Inventory",
            error,
        });
    }
};

// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find({
                organisation: req.body.userId,
            })
            .limit(3)
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "recent Inventory Data",
            inventory,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Recent Inventory API",
            error,
        });
    }
};

// GET DONOR RECORDS
const getDonorsController = async (req, res) => {
    try {
        const organisation = req.body.userId;
        //find donors
        const donorId = await inventoryModel.distinct("donor", {
            organisation,
        });
        // console.log(donorId);
        const donors = await userModel.find({ _id: { $in: donorId } });

        return res.status(200).send({
            success: true,
            message: "Donor Record Fetched Successfully",
            donors,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Donor records",
            error,
        });
    }
};

const getHospitalController = async (req, res) => {
    try {
        const organisation = req.body.userId;
        //GET HOSPITAL ID
        const hospitalId = await inventoryModel.distinct("hospital", {
            organisation,
        });
        //FIND HOSPITAL
        const hospitals = await userModel.find({
            _id: { $in: hospitalId },
        });
        return res.status(200).send({
            success: true,
            message: "Hospitals Data Fetched Successfully",
            hospitals,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In get Hospital API",
            error,
        });
    }
};

// GET ORG PROFILES
const getOrganisationController = async (req, res) => {
    try {
        const donor = req.body.userId;
        const orgId = await inventoryModel.distinct("organisation", { donor });
        //find org
        const organisations = await userModel.find({
            _id: { $in: orgId },
        });
        return res.status(200).send({
            success: true,
            message: "Org Data Fetched Successfully",
            organisations,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In ORG API",
            error,
        });
    }
};
// GET ORG for Hospital
const getOrganisationForHospitalController = async (req, res) => {
    try {
        const hospital = req.body.userId;
        const orgId = await inventoryModel.distinct("organisation", { hospital });
        //find org
        const organisations = await userModel.find({
            _id: { $in: orgId },
        });
        return res.status(200).send({
            success: true,
            message: "Hospital Org Data Fetched Successfully",
            organisations,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Hospital ORG API",
            error,
        });
    }
};

module.exports = {
    createInventoryController,
    getInventoryController,
    getDonorsController,
    getHospitalController,
    getOrganisationController,
    getOrganisationForHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController,
};