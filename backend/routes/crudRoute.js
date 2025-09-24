let express = require("express");
let CRUD = require("../models/crudSchema");
let Route = express.Router();

Route.get("/", async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;

    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { firstname: { $regex: search, $options: "i" } },
          { lastname: { $regex: search, $options: "i" } },
        ],
      };
    }

    const total = await CRUD.countDocuments(query);
    const data = await CRUD.find(query).skip(skip).limit(limit);

    res.json({
      status: "success",
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

Route.post("/", async (req, res) => {
  try {
    const data = req.body;
    const createRec = await CRUD.create(data);
    res.json({ status: "success", data: createRec });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

Route.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CRUD.findById(id);
    res.json({ status: "success", data: data });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});
Route.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await CRUD.findByIdAndUpdate(id, data, { new: true });
    res.json({ status: "success", data: updatedData });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

Route.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const delData = await CRUD.findByIdAndDelete(id);
    res.json({ status: "success", data: delData });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = Route;
