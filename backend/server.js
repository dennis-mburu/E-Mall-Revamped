import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

connectDB();

const port = process.env.PORT || 5000;

const app = express();

// json body parser middleware
app.use(express.json());

// x-www-form-url-encoded (key value pairs (from postman)) body parser middleware
app.use(express.urlencoded({ extended: true }));

//middleware to extract cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
