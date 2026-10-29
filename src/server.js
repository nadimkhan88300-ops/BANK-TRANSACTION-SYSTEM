
require("dotenv").config({ path: "./src/.env" });

const app = require("./app");
const connectDB = require("./db");

async function startServer() {
    await connectDB();

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

startServer();
