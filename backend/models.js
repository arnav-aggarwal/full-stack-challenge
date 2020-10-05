const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const { Sequelize } = require("sequelize");

class Shipment extends Model {
  async activate() {
    this.isActive = true;
    await this.save();
  }
  async deactivate() {
    this.isActive = false;
    await this.save();
  }
}

Shipment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    containerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carrierScac: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = {
  Shipment,
};
