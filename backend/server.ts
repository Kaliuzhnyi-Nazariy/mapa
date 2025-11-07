import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ajMiddleware } from "./middlewares";
import db from "./db/db";
import initTablesDB from "./db/createDBs";
import authRoutes from "./routes/auth";
import errorRoute from "./routes/error";
import path from "path";

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // app.all("/{*any}", (_req, res) => {
  //   res.setHeader(
  //     "Content-Security-Policy",
  //     [
  //       "default-src 'self';",
  //       "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;",
  //       "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;",
  //       "font-src 'self' https://fonts.gstatic.com;",
  //       "img-src 'self' data: blob: https://*;",
  //       "connect-src 'self' https://api.yourdomain.com https://*;",
  //       "frame-src 'self';",
  //       "object-src 'none';",
  //       "base-uri 'self';",
  //       "form-action 'self';",
  //     ].join(" ")
  //   );

  //   res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  // });

  app.get("*", (_req, res) => {
    res.setHeader(
      "Content-Security-Policy",
      [
        "default-src 'self';",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;",
        "font-src 'self' https://fonts.gstatic.com;",
        "img-src 'self' data: blob: https://*;",
        "connect-src 'self' https://api.yourdomain.com https://*;",
        "frame-src 'self';",
        "object-src 'none';",
        "base-uri 'self';",
        "form-action 'self';",
      ].join(" ")
    );

    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

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
