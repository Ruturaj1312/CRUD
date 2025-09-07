let express = require("express");
let CRUD = require("../models/crudSchema");
let Route = express.Router();

Route.get("/", async (req, res) => {
  try {
    const data = await CRUD.find();

    res.json({ status: "success", data: data });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});

Route.post("/", async (req, res) => {
  try {
    const data = req.body;
    const createRec = await CRUD.create(data);
    res.json({ status: "success", data: createRec });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});

Route.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CRUD.findById(id);
    res.json({ status: "success", data: data });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});
Route.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await CRUD.findByIdAndUpdate(id, data, { new: true });
    res.json({ status: "success", data: updatedData });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});

Route.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const delData = await CRUD.findByIdAndDelete(id);
    res.json({ status: "success", data: delData });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});

module.exports = Route;
