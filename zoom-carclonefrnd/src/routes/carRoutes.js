const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

// Route to get all cars
router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to add a new car
router.post("/AddCar", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).send("Car added successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to edit car details
router.put("/editcar/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      car.name = req.body.name;
      car.image = req.body.image;
      car.fuelType = req.body.fuelType;
      car.rentPerHour = req.body.rentPerHour;
      car.capacity = req.body.capacity;
      await car.save();
      res.status(200).send("Car details updated successfully");
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to delete a car
router.delete("/deletecar/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (car) {
      res.status(200).send("Car deleted successfully");
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
