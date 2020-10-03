import React, { useState } from "react";
import PropTypes from "prop-types";
import { postShipment, changeActiveStatus, deleteShipment, deleteAllShipments } from "../../api";
import "./ShipmentList.scss";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString();
}

function validateContainerId(id) {
  return /[a-zA-Z]{3}(u|U|j|J|z|Z)\d{7}/.test(id);
}

function validateScac(scac) {
  return /[a-zA-Z]{2,4}/.test(scac);
}

function formatContainerId(id) {
  return `${id.slice(0, 4)}-${id.slice(4, -1)}-${id.slice(-1)}`
}

function ShipmentListItem({
  shipment: { id, carrierScac, containerId, createdAt, isActive },
  refreshShipments,
}) {
  // TODO: Toast notifications for active/inactive button
  // TODO: Make items draggable
  const MarkInactiveButton = () => <button onClick={markInactive}>Mark Inactive</button>;
  const MarkActiveButton = () => <button onClick={markActive}>Mark Active</button>;

  async function markInactive() {
    await changeActiveStatus(id, { isActive: false });
    refreshShipments();
  }

  async function markActive() {
    await changeActiveStatus(id, { isActive: true });
    refreshShipments();
  }

  async function removeShipment() {
    await deleteShipment(id);
    refreshShipments();
  }

  return (
    <li className={`ShipmentListItem ${isActive ? 'active' : 'inactive'}`}>
      <p className="ShipmentListItem-title">
        {carrierScac} / {formatContainerId(containerId)}
      </p>
      <p>Created {formatDate(createdAt)}</p>
      {isActive ? <MarkInactiveButton /> : <MarkActiveButton />}
      <button onClick={removeShipment}>Delete</button>
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
  shipment: ShipmentPropType,
  refreshShipments: PropTypes.func,
}

function CreateShipmentForm({ refreshShipments }) {
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
    refreshShipments();
  }

  // TODO: Clean up form, make modal?
  return (
    <form onSubmit={createShipment}>
      <label>
        Container ID:
        <br />
        <input
          name="containerId"
          placeholder="Container ID"
          value={formInputs.containerId}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <br />
      <label>
        Carrier SCAC:
        <br />
        <input
          name="carrierScac"
          placeholder="Carrier SCAC"
          value={formInputs.carrierScac}
          onChange={handleInputChange}
        />
      </label>
      <br />
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

CreateShipmentForm.propTypes = {
  refreshShipments: PropTypes.func,
};

function ShipmentList({ shipments, refreshShipments }) {
  const [creatingShipment, setCreatingShipment] = useState(false);
  const showCreateShipmentForm = () => setCreatingShipment(true);
  const hideCreateShipmentForm = () => setCreatingShipment(false);

  const [showing, setShowing] = useState({
    active: true,
    inactive: true,
  });

  function handleInputChange(event) {
    setShowing({
      ...showing,
      [event.target.name]: event.target.checked,
    });
  }

  let shipmentsToShow = shipments;
  if(!showing.active) {
    shipmentsToShow = shipmentsToShow.filter(item => !item.isActive);
  }

  if(!showing.inactive) {
    shipmentsToShow = shipmentsToShow.filter(item => item.isActive);
  }

  async function deleteAll() {
    await deleteAllShipments();
    refreshShipments();
  }

  return (
    <>
      <div id="shipment-list-header">
        {creatingShipment ?
          <button className="create-shipment-button" onClick={hideCreateShipmentForm}>Cancel</button> :
          <button className="create-shipment-button" onClick={showCreateShipmentForm}>Create Shipment</button>
        }
        {creatingShipment && (
          <>
            <br />
            <br />
            <CreateShipmentForm
              refreshShipments={refreshShipments}
            />
            <br />
            <br />
          </>
        )}
      </div>
      <div>
        <h2>Show:</h2>
        <label>
          Active
          <input
            name="active"
            type="checkbox"
            checked={showing.active}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Inactive
          <input
            name="inactive"
            type="checkbox"
            checked={showing.inactive}
            onChange={handleInputChange}
          />
      </label>
      </div>
      <ul className="ShipmentList">
        {shipmentsToShow.map((shipment) => (
          <ShipmentListItem
            key={`shipment-${shipment.id}`}
            shipment={shipment}
            refreshShipments={refreshShipments}
          />
        ))}
      </ul>
      <button onClick={() => refreshShipments()}>Refresh List</button>
      <button onClick={deleteAll}>Delete List</button>
    </>
  );
}

ShipmentList.propTypes = {
  shipments: PropTypes.arrayOf(ShipmentPropType),
  refreshShipments: PropTypes.func
};

export default ShipmentList;
