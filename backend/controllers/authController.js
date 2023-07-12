const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async(req,res) => {
    try {
        const exisitingUser = await userModel.findOne({email:req.body.email})
        //validation
        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:'Користувач уже існує'
            })
        }
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
        //rest data
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success: true,
            message: "Користувач успішно зареєстрований",
            user,
        })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Register API',
            error
        })
    }
};

//login call back
const  loginController = async (req,res) => {
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Користувача не знайдено'
            })
        }
        //check role
        if(user.role !== req.body.role){
            return res.status(500).send({
                success:false,
                message:"Роль не відповідає"
            })
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message: 'Невірний пароль'
            })
        }
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET,{}, {expiresIn:'1d'});
        return res.status(200).send({
            success:true,
            message:"Логанізація успішна",
            token,
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error IN Login API',
            error
        })
    }
};

//GET CURRENT USER
const currentUserController = async (req,res) => {
    try{
        const user = await userModel.findOne({_id:req.body.userId})
        return  res.status(200).send ({
            success:true,
            message:"Користувача успішно отримано",
            user,
        })
    }catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Не вдалося отримати поточного користувача",
            error
        })
    }
};

module.exports = { registerController, loginController, currentUserController };
