import dotenv from 'dotenv';
import app from "app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

console.log(PORT);


// const startServer = async () => {
//     try {
//         // await connectDB();

//         const server = app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });

//         const shutdown = () => {
//             server.close(() => process.exit(0));
//         };

//         process.on("SIGINT", shutdown);
//         process.on("SIGTERM", shutdown);
//     } catch (error) {
//         console.error("Server startup failed", error);
//         process.exit(1);
//     }
// };

// startServer();