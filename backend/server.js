// const express = require("express");
// const dotenv = require("dotenv");
// const colors = require("colors");
// const morgan = require("morgan");
// const cors = require("cors");
// const connectDB = require("./config/db");
// //dot config
// dotenv.config();
//
// //mongodb connection
// connectDB();
//
// //rest object
// const app = express();
//
// //middlewares
// app.use(express.json());
// app.use(cors());
// app.use(morgan("dev"));
//
// //routes
// // 1 test route
// app.use("/api/v1/test", require("./routes/testRoutes"));
// app.use("/api/v1/auth", require("./routes/authRouters"));
// app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
//
//
// //port
// const PORT = process.env.PORT || 8080;
//
// //listen
// app.listen(PORT, () => {
//     console.log(
//         `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
//             .bgBlue.white
//     );
// });
const express = require("express");
const dotenv = require("dotenv");

const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require('mongoose');
//dot config
dotenv.config();
mongoose.set('strictQuery', false);
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
        //api
        app.get("/", (req, res) => {
            res.send("Server is running");
        });
        //routes
        // 1 test route
        app.use("/api/v1/test", require("./routes/testRoutes"));
        app.use("/api/v1/auth", require("./routes/authRoutes"));
        app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
        app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
        app.use("/api/v1/admin", require("./routes/adminRoutes"));

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
