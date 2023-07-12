const inventoryModel= require("../models/inventoryModel")
const mongoose = require("mongoose");
// Get blood data
const bloodGroupDetailsController = async (req,res) => {
    try{
        const bloodGroups = ['I(0+)', 'I(0-)', 'IV(AB+)', 'IV(AB-)', 'II(A+)', 'II(A-)', 'III(B+)','III(B-)'];
        const bloodGroupData = []
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        //get single blood group
        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            //count Total IN
            const totalIn = await inventoryModel.aggregate([
                {$match: {
                        bloodGroup:bloodGroup,
                        inventoryType: 'вхід',
                        organization
                    }},
                {
                    $group:{
                        _id:null,
                        total: {$sum:'$quantity'}
                    }
                }
            ]);
            //count Total OUT
            const totalOut = await inventoryModel.aggregate([
                {$match: {
                        bloodGroup:bloodGroup,
                        inventoryType: 'вихід',
                        organization
                    }},
                {
                    $group:{
                        _id:null,
                        total: {$sum:'$quantity'}
                    }
                }
            ]);
            //calculate total
            const availabeBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0)

            //PUSH DATA
            bloodGroupData.push({
                bloodGroup,
                totalIn: totalIn[0]?.total || 0,
                totalOut: totalOut[0]?.total || 0,
                availabeBlood
            })
        }
        ))
        return res.status(200).send({
            success: true,
            message: "Blood Group Data Fetch Successfully",
            bloodGroupData,
        })
    } catch(error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: "Error In  Blood Group Data Analytics Api",
            error,
        })
    }
}

module.exports = {bloodGroupDetailsController}