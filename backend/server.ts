import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ajMiddleware } from "./middlewares";
import db from "./db/db";
import initTablesDB from "./db/createDBs";
import authRoutes from "./routes/auth";
import errorRoute from "./routes/error";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(cookieParser());

app.use(ajMiddleware);

app.use("/api/auth", authRoutes);

app.use(errorRoute);

db.connect()
  .then(() => {
    initTablesDB().then(() => {
      try {
        app.listen(process.env.PORT);
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    });
  })
  .catch((err) => {
    console.log("Failed db connection! Reason: ", err);
  });
