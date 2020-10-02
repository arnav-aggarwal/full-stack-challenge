import React, { useState } from "react";
import PropTypes from "prop-types";
import { postShipment } from "../../api";
import "./ShipmentList.css";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString();
}

function ShipmentListItem({
  shipment: { carrierScac, containerId, createdAt, isActive },
}) {
  // TODO: Add button to activate/inactivate
  // TODO: Filter by active/inactive status
  // TODO: Toast notifications for active/inactive button
  // TODO: Make items draggable
  // TODO: Make items deletable
  // TODO: Allow all items to be deleted
  return (
    <li className="ShipmentListItem">
      <p className="ShipmentListItem-title">
        {carrierScac} / {containerId}
      </p>
      <p>Created {formatDate(createdAt)}</p>
      <p>Is Active: {'' + isActive}</p>
    </li>
  );
}

const ShipmentPropType = PropTypes.shape({
  id: PropTypes.string,
  containerId: PropTypes.string,
  carrierScac: PropTypes.string,
  isActive: PropTypes.bool,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
});

ShipmentListItem.propTypes = {
  shipment: ShipmentPropType
}

function CreateShipmentForm({ refreshCurrentShipments }) {
  // TODO: Add prop types
  const [formInputs, setFormInputs] = useState({
    containerId: '',
    carrierScac: '',
    isActive: true
  });

  function handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setFormInputs({
      ...formInputs,
      [target.name]: value,
    });
  };

  async function createShipment(event) {
    // TODO: Validate containerId & carrierScac
    // TODO: Write validation tests
    // TODO: Toast notifications
    event.preventDefault();
    await postShipment(formInputs);
    refreshCurrentShipments();
  }

  // TODO: Clean up form, make modal?
  return (
    <form onSubmit={createShipment}>
      <input
        name="containerId"
        placeholder="Container ID"
        value={formInputs.containerId}
        onChange={handleInputChange}
      />
      <br />
      <input
        name="carrierScac"
        placeholder="Carrier SCAC"
        value={formInputs.carrierScac}
        onChange={handleInputChange}
      />
      <br />
      <label>
        Active:
        <input
          name="isActive"
          type="checkbox"
          checked={formInputs.isActive}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}

function ShipmentList({ shipments, onRefreshClick }) {
  const [creatingShipment, setCreatingShipment] = useState(false);
  const showCreateShipmentForm = () => setCreatingShipment(true);
  const hideCreateShipmentForm = () => setCreatingShipment(false);

  return (
    <>
      <h1>Current Shipments</h1>
      {creatingShipment ?
        <button onClick={hideCreateShipmentForm}>Cancel</button> :
        <button onClick={showCreateShipmentForm}>Create Shipment</button>
      }
      {creatingShipment && (
        <>
          <br />
          <br />
          <CreateShipmentForm
            refreshCurrentShipments={onRefreshClick}
          />
          <br />
          <br />
        </>
      )}
      <ul className="ShipmentList">
        {shipments.map((shipment) => (
          <ShipmentListItem
            key={`shipment-${shipment.id}`}
            shipment={shipment}
          />
        ))}
      </ul>
      <button onClick={() => onRefreshClick()}>Refresh List</button>
    </>
  );
}

ShipmentList.propTypes = {
  shipments: PropTypes.arrayOf(ShipmentPropType),
  onRefreshClick: PropTypes.func
};

export default ShipmentList;
