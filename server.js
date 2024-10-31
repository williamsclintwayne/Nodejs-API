require("dotenv").config();
const express = require(`express`);
const mongoose = require("mongoose");
const productRoute = require(`./routes/productRoute`);
const errorMiddleware = require(`./middleware/errorMiddleware`);
var cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND;

// this is used to only give specific origin access to the api data
var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// use this to add cors policy
app.use(cors(corsOptions));
// use this so that the app can understand to use .json types
app.use(express.json());
// use this so that the app can understand to use forms types
app.use(express.urlencoded({ extended: false }));

// routes

app.use("/api/product", productRoute);

app.get("/", (req, res) => {
  res.send(`hello NODE API`);
});

app.get("/blog", (req, res) => {
  res.send(`hello blog My name is Clint`);
});

app.use(errorMiddleware);

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to MongodB");
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
