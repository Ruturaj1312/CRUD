const mongoose = require("mongoose");

const CrudSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  mobile: Number,
});

const CRUD = mongoose.model("cruds", CrudSchema);

module.exports = CRUD;
