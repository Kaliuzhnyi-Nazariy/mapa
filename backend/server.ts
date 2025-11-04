import express, {
  request,
  response,
  NextFunction,
  Response,
  Request,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ajMiddleware } from "./middlewares/aj";
import db from "./db/db";
import initTablesDB from "./db/createDBs";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(ajMiddleware);

app.get("/", async (req: Request, res: Response) => {
  const { rows } = await db.query("SELECT * FROM Users;");
  res.send({ rows });
});

db.connect()
  .then(() => {
    console.log("DB successfully up and running!");
    initTablesDB().then(() => {
      try {
        app.listen(process.env.PORT, () => {
          console.log("everything is running successfully!");
        });
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    });
  })
  .catch((err) => {
    console.log("Failed db connection! Reason: ", err);
  });
