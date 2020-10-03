import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import ShipmentListItem from './ShipmentListItem';
import CreateShipmentForm from './CreateShipmentForm';
import ShipmentPropType from './shipmentPropType';
import { deleteAllShipments } from '../../api';

import './ShipmentList.scss';

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
    toast.success(`All shipments deleted.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    refreshShipments();
  }

  return (
    <>
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
      <div id="create-shipment-container">
        {creatingShipment ? (
          <CreateShipmentForm
            refreshShipments={refreshShipments}
            hideCreateShipmentForm={hideCreateShipmentForm}
            shipments={shipments}
          />
        ) : (
          <button
            className="create-shipment-button pure-button"
            onClick={showCreateShipmentForm}
          >
            Create Shipment
          </button>
        )}
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
      <button className="pure-button" onClick={() => refreshShipments()}>Refresh List</button>
      <button className="pure-button button-warning" onClick={deleteAll}>Delete List</button>
    </>
  );
}

ShipmentList.propTypes = {
  shipments: PropTypes.arrayOf(ShipmentPropType),
  refreshShipments: PropTypes.func
};

export default ShipmentList;
