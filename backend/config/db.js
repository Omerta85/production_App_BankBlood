const mongoose = require("mongoose");


const connectDB = async () =>{
    try{
        await  mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To Mongodb Database${mongoose.connection.host}`.bgMagenta.blue);
    } catch (error) {
        console.log(`Mongodb Database ${error}`.bgRed.white)
    }
};

module.exports = connectDB;
