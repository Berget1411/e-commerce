import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT || 5173;
const app = express();

app.use(express.json()); // parse json bodies in request object
app.use(cookieParser()); // parse cookies
app.use(cors());

app.use("/api", routes);

app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on("error", (error) => {
    console.error(`Error starting server: ${error}`);
  });
