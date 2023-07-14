const mongoose = require("mongoose");


const connectDB = async () =>{
    try{
        await  mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology: true});
        console.log(`Connected To Mongodb Database${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Mongodb Database ${error}`)
    }
};

module.exports = connectDB;
