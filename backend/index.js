const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));


mongoose.connect(
  process.env.MONGOURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("mongo db connected successfully");
    else
      console.log("Error while connecting" + JSON.stringify(err, undefined, 2));
  }
);

app.use("/users", require("./routes/userRouter"));
app.use("/todo", require("./routes/todoRouter"));
