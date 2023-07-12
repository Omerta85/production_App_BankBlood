const userModel = require('../models/userModel')

//Get DONOR list
const getDonorsListController = async (req,res) => {
    try{
        const donorData = await userModel
            .find({role:"donor"})
            .sort({ createdAt:-1})
            .exec();
            return res.status(200).send({
                success:true,
                Totalcount: donorData.length,
                message: "Donor List Fetched Successfully",
                donorData,
            })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: "Error In Donor List API",
            error,
        })
    }
};
//Get Hospital List
const getHospitalListController = async (req,res) => {
    try{
        const hospitalData = await userModel
            .find({role:"hospital"})
            .sort({ createdAt:-1})
            .exec();
        return res.status(200).send({
            success:true,
            Totalcount: hospitalData.length,
            message: "Hospital List Fetched Successfully",
            hospitalData,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: "Error In Hospital List API",
            error,
        })
    }
};
//Get ORG List
const getOrgListController = async (req,res) => {
    try{
        const organizationData = await userModel
            .find({role:"organization"})
            .sort({ createdAt:-1})
            .exec();
        return res.status(200).send({
            success:true,
            Totalcount: organizationData.length,
            message: "ORG List Fetched Successfully",
            organizationData,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: "Error In ORG List API",
            error,
        })
    }
};

//========================
//Delete
const deleteRecordController = async (req,res) =>{
    try{
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:" Record Deleted successfully"
        });
    }catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error while deleting record',
            error,
        })
    }
};


module.exports = {
    getDonorsListController,
    getHospitalListController,
    getOrgListController,
    deleteRecordController
}