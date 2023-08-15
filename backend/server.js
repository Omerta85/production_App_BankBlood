
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
//dot config
dotenv.config();

// виклик функції з асинхронним підключенням до бази даних
const startServer = async () => {
    try {
        // підключення до бази даних
        await connectDB();

        //rest object
        const app = express();

        //middlewares
        app.use(express.json());
        app.use(cors());
        app.use(morgan("dev"));

        //routes
        // 1 test route
        app.use("/test", require("./routes/testRoutes"));
        app.use("/auth", require("./routes/authRoutes"));
        app.use("/inventory", require("./routes/inventoryRoutes"));
        app.use("/analytics", require("./routes/analyticsRoutes"));
        app.use("/admin", require("./routes/adminRoutes"));

        //port
        const PORT = process.env.PORT || 8080;

        //listen
        app.listen(PORT, () => {
            console.log(
                `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
            );
        });
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

// запуск сервера
startServer();