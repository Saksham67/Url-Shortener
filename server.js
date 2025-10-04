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
    "mongodb+srv://ys8048885_db_user:s6WnWw5xj8ovhn8F@cluster0.j6l6ecd.mongodb.net/",
    {
      dbName: "Url_Shortener",
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
