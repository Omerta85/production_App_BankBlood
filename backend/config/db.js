const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const connectDB = async () =>{
    try{
        await  mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To Mongodb Database${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Mongodb Database ${error}`)
    }
};

module.exports = connectDB;
