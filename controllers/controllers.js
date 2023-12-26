const { dbModel } = require("../models/models");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const { User } = await dbModel();
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { User } = await dbModel();
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    res.status(201).json({ user });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.status === 400) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const getWaterWellQuantity = async (req, res) => {
  try {
    const { WaterWell } = await dbModel();
    const water_well_quantity = await WaterWell.findAll();
    res.json(water_well_quantity);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const saveWaterWellDonation = async (res, req) => {
  try {
  } catch (error) {}
};

module.exports = {
  getUsers,
  createUser,
  getWaterWellQuantity,
  saveWaterWellDonation,
};
