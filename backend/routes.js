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

// Post /api/shipments
// Creates a new shipment
router.post("/shipments", async(req, res) => {
  const newShipment = await Shipment.create(req.body);
  res.status(201).send(newShipment);
});

// Patch /api/shipments/:id
// Sets shipment active status
router.patch("/shipments/:id", async(req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  const shipments = await Shipment.findAll({ where: { id }});
  const thisShipment = shipments[0];

  await isActive ? thisShipment.activate() : thisShipment.deactivate();
  res.send(thisShipment);
});

// Delete /api/shipments/:id
// Deletes a shipment
router.delete("/shipments/:id", async(req, res) => {
  const { id } = req.params;
  const shipments = await Shipment.findAll({ where: { id }});

  const thisShipment = shipments[0];
  await thisShipment.destroy();

  res.send(thisShipment);
});

// Delete /api/all-shipments/
// Deletes ALL shipments
router.delete("/all-shipments", async(req, res) => {
  await Shipment.destroy({ truncate: true });
  res.send('Deleted list');
});

module.exports = router;
