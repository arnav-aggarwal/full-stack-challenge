import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import ShipmentListItem from './ShipmentListItem';
import CreateShipmentForm from './CreateShipmentForm';
import ShipmentPropType from './shipmentPropType';
import { cleanContainerId } from './helpers';
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
      [event.target.name]: !showing[event.target.name],
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
    shipmentsToShow.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1);
  }

  if(displayOrder === 'scac') {
    shipmentsToShow.sort((a, b) => {
      if(a.carrierScac === b.carrierScac) {
        return a.containerId > b.containerId ? 1 : -1;
      }

      return a.carrierScac > b.carrierScac ? 1 : -1
    });
  }

  const [searchValue, updateSearchValue] = useState('');
  const handleSearch = event => updateSearchValue(cleanContainerId(event.target.value));

  shipmentsToShow = shipmentsToShow.filter(
    item => item.carrierScac.includes(searchValue) || item.containerId.includes(searchValue)
  );

  async function deleteAll() {
    await deleteAllShipments();
    toast.success(`All shipments deleted.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    refreshShipments();
  }

  return (
    <div id="main">
      <div id="header-buttons-wrapper" className="header-controls">
        <div>
          <h3>Show</h3>
          <div className="two-button-container">
            <button
              name="active"
              className={`pure-button ${showing.active ? 'pure-button-primary' : ''}`}
              onClick={handleShowingChange}
            >
              Active
            </button>
            <button
              name="inactive"
              className={`pure-button ${showing.inactive ? 'pure-button-primary' : ''}`}
              onClick={handleShowingChange}
            >
              Inactive
            </button>
          </div>
        </div>
        <div>
          <h3>Order by</h3>
          <div className="two-button-container">
            <button
              name="date"
              className={`pure-button ${displayOrder === 'date' ? 'pure-button-primary' : ''}`}
              onClick={orderByDate}
            >
              Date
            </button>
            <button
              name="scac"
              className={`pure-button ${displayOrder === 'scac' ? 'pure-button-primary' : ''}`}
              onClick={orderByScac}
            >
              SCAC
            </button>
          </div>
        </div>
      </div>
      <div id="header-search" className="header-controls">
        <h3>Search</h3>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Enter carrier SCAC or container ID"
        />
      </div>
      <div
        id="create-shipment-container"
        className={creatingShipment ? 'form-container' : 'button-container'}
      >
        {creatingShipment ? (
          <CreateShipmentForm
            refreshShipments={refreshShipments}
            hideCreateShipmentForm={hideCreateShipmentForm}
            shipments={shipments}
          />
        ) : (
          <button
            className="create-shipment-button pure-button pure-button-primary"
            onClick={showCreateShipmentForm}
          >
            + Create Shipment
          </button>
        )}
      </div>
      <ul id="shipment-list">
        {shipmentsToShow.map((shipment) => (
          <ShipmentListItem
            key={`shipment-${shipment.id}`}
            shipment={shipment}
            refreshShipments={refreshShipments}
          />
        ))}
      </ul>
      <div className="two-button-container">
        <button className="pure-button" onClick={() => refreshShipments()}>Refresh List</button>
        <button className="pure-button button-warning" onClick={deleteAll}>Delete List</button>
      </div>
    </div>
  );
}

ShipmentList.propTypes = {
  shipments: PropTypes.arrayOf(ShipmentPropType),
  refreshShipments: PropTypes.func
};

export default ShipmentList;
