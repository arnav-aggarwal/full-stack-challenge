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

  function handleShowingChange(event) {
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

  const [displayOrder, changeDisplayOrder] = useState('date')
  const orderByDate = () => changeDisplayOrder('date');
  const orderByScac = () => changeDisplayOrder('scac');

  if(displayOrder === 'date') {
    shipmentsToShow.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
    });
  }

  if(displayOrder === 'scac') {
    shipmentsToShow.sort((a, b) => {
      if(a.carrierScac === b.carrierScac) {
        return a.containerId > b.containerId ? 1 : -1;
      }

      return a.carrierScac > b.carrierScac ? 1 : -1
    });
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
            onChange={handleShowingChange}
            />
        </label>
        <label>
          Inactive
          <input
            name="inactive"
            type="checkbox"
            checked={showing.inactive}
            onChange={handleShowingChange}
            />
        </label>
      </div>
      <div>
        <h2>Order by:</h2>
        <label>
          Date Created
          <input
            // name="date"
            type="checkbox"
            checked={displayOrder === 'date'}
            onChange={orderByDate}
            />
        </label>
        <label>
          Carrier SCAC
          <input
            // name="scac"
            type="checkbox"
            checked={displayOrder === 'scac'}
            onChange={orderByScac}
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
