import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { getOriginalUrl, shortUrl } from "./Controllers/url.js";

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 1000;
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      dbName: process.env.DB_NAME,
    }
  )
  .then(() => console.log("MongoDB Connected..!"))
  .catch((err) => console.log(err));

//rendering ejs file
app.get("/", (req, res) => {
  res.render("index.ejs", { shortUrl: null });
});

//shorting url logic, using shortUrl fn. from controllers
app.post("/shorted", shortUrl);

//redirect to original url using short code(dynamic routing)
app.get("/:shortCode", getOriginalUrl);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
