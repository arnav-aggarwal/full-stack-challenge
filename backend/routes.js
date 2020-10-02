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
  const newShipment = await Shipment.create(req.body);
  res.status(201).send(newShipment);
});

router.patch("/shipments/:id", async(req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  const shipments = await Shipment.findAll({ where: { id }});
  const thisShipment = shipments[0];

  thisShipment.isActive = isActive;
  await thisShipment.save();

  res.send(thisShipment);
});

router.delete("/shipments/:id", async(req, res) => {
  const { id } = req.params;
  const shipments = await Shipment.findAll({ where: { id }});

  const thisShipment = shipments[0];
  await thisShipment.destroy();

  res.send(thisShipment);
});

module.exports = router;
