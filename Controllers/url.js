import { Url } from "../Models/Url.js";
import shortid from "shortid";

export const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = shortid.generate();

  const shortUrl = `http://localhost:1000/${shortCode}`;

  //saving into database(longUrl and shortUrl), why? becoz we've to check kis longUrl ke liye kon sa shorturl h and also when shortid generate krega shortCode and user click krega uspe to usse fir whi longUrl(original) pe redirect kr dega
  const newUrl = new Url({ shortCode, longUrl });
  await newUrl.save();

  console.log("Short and long url saved =", newUrl);

  res.render("index.ejs", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  // finding with shortCode(includes all) in database

  const originalUrl = await Url.findOne({ shortCode });
  if (originalUrl) {
    res.redirect(originalUrl.longUrl);
  } else {
    res.json({ message: "Invalid shortCode" });
  }
};
