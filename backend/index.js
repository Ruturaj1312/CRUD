let express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/crud").then((res) => {
  console.log("DB Connected successfully");
});

let app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hii node js");
});

app.use("/crud", require("./routes/crudRoute"));
app.use("/user", require("./routes/userRoute"));

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
