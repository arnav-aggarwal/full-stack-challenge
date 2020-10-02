import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ShipmentList.css";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString();
}

function ShipmentListItem({
  shipment: { carrierScac, containerId, createdAt },
}) {
  return (
    <li className="ShipmentListItem">
      <p className="ShipmentListItem-title">
        {carrierScac} / {containerId}
      </p>
      <p>Created {formatDate(createdAt)}</p>
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

function createShipment(event) {
  // event.preventDefault();
  // const data = new FormData(event.target);
  // console.log(data.get('isActive'));
}

function CreateShipmentForm() {
  return (
    <form onSubmit={createShipment}>
      <input name="containerId" placeholder="Container ID"></input>
      <br />
      <input name="carrierScac" placeholder="Carrier SCAC"></input>
      <br />
      <label>
        Active:
        <input name="isActive" type="checkbox" id="active" defaultChecked></input>
      </label>
      <br />
      <br />
      <button>Submit</button>
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
          <CreateShipmentForm />
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
