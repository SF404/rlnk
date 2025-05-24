import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";
import urlRoutes from "./routes/urlshort.routes";
import { getFullUrl } from "./controller/url.controller";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);
app.get("/:short", getFullUrl);

// connect database
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
