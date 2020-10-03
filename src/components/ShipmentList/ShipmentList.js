import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import ShipmentListItem from './ShipmentListItem';
import ShipmentPropType from './shipmentPropType';
import { validateContainerId, validateScac, createShipmentTitle } from './helpers';
import { postShipment, deleteAllShipments } from '../../api';

import './ShipmentList.scss';

function CreateShipmentForm({ refreshShipments, hideCreateShipmentForm, shipments }) {
  const formInputDefaults = {
    containerId: '',
    carrierScac: '',
    isActive: true,
  };

  const [formInputs, setFormInputs] = useState(formInputDefaults);

  function handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value.toUpperCase();

    setFormInputs({
      ...formInputs,
      [target.name]: value,
    });
  };

  async function createShipment(event) {
    // TODO: Write validation tests
    event.preventDefault();

    const { carrierScac, containerId } = formInputs;

    if(!validateContainerId(containerId)) {
      toast.warning(`Please ensure you've entered a valid container ID.`, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'invalid-container-id',
      });

      return;
    }

    if(!validateScac(carrierScac)) {
      toast.warning(`Please ensure you've entered a valid carrier SCAC.`, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'invalid-carrier-scac',
      });

      return;
    }

    const shipmentTitle = createShipmentTitle(formInputs.carrierScac, formInputs.containerId);

    if(shipments.find(item => item.carrierScac === carrierScac && item.containerId === containerId)) {
      toast.warning(`You're already tracking shipment ${shipmentTitle}.`, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: `duplicate-entry-${shipmentTitle}`,
      });

      return;
    }

    await postShipment(formInputs);
    toast.success(`Shipment ${shipmentTitle} created.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    refreshShipments();
    setFormInputs(formInputDefaults);
  }

  return (
    <div
      id="create-shipment-form"
      className={formInputs.isActive ? 'active' : 'inactive'}
    >
      <form onSubmit={createShipment}>
        <label>
          <h3>
            Container ID
          </h3>
          <input
            type="text"
            name="containerId"
            placeholder="Container ID"
            value={formInputs.containerId}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <h3>
            Carrier SCAC
          </h3>
          <input
            type="text"
            name="carrierScac"
            placeholder="Carrier SCAC"
            value={formInputs.carrierScac}
            onChange={handleInputChange}
          />
        </label>
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
        <input className="pure-button pure-button-primary" type="submit" value="Submit" />
        <button className="pure-button" onClick={hideCreateShipmentForm}>Cancel</button>
      </form>
    </div>
  );
}

CreateShipmentForm.propTypes = {
  refreshShipments: PropTypes.func,
  hideCreateShipmentForm: PropTypes.func,
  shipments: PropTypes.array,
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
        {creatingShipment && (
          <CreateShipmentForm
            refreshShipments={refreshShipments}
            hideCreateShipmentForm={hideCreateShipmentForm}
            shipments={shipments}
          />
        )}
        {!creatingShipment && (
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
