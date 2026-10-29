
const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(
            "mongodb+srv://nadimkhan88300_db_user:NaDiM1234@cluster0.xaazoec.mongodb.net/?appName=Cluster0"
        );

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;