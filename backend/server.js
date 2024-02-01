import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
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

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// Get Paypal clientId
app.get("/api/config/paypal", (req, res) =>
  // {throw new Error("ClientId not Found")}
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Set "/uploads" folder as static
const __dirname = path.resolve(); //set __dirname to project's root directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  // set the react build folder to be static
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any other routes aside from the ones above (those with /api)  will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
