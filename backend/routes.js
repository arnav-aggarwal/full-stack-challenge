const express = require("express");
const router = new express.Router();
const { Shipment } = require("./models");

// Your API endpoints should be implemented here

// GET /api/shipments
// Returns an array of all shipments
router.get("/shipments", async (req, res) => {
  const shipments = await Shipment.findAll();
  res.json(shipments);
});

router.post("/shipments", async(req, res) => {
  console.log(req.body);
  res.status(201).send('Success');
});

module.exports = router;
