const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;

const connectDB = async () => {
    try{
        await mongoose.connect(db);
        console.log("MongoDB connected");
    }
    catch(err){
        console.error(err.message);
        process.exit(1); //Exit process with failure
    }
}

module.exports = connectDB;