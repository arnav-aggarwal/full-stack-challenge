import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { validateContainerId, validateScac, createShipmentTitle, cleanContainerId } from '../helpers';
import { postShipment } from '../../../api';

import './CreateShipmentForm.scss';

export default function CreateShipmentForm({ refreshShipments, hideCreateShipmentForm, shipments }) {
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

    const editedFormInputs = {
      ...formInputs,
      containerId: cleanContainerId(formInputs.containerId),
    };

    const { carrierScac, containerId } = editedFormInputs;

    if(!validateScac(carrierScac)) {
      toast.warning(`Please ensure you've entered a valid carrier SCAC.`, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'invalid-carrier-scac',
      });

      return;
    }

    if(!validateContainerId(containerId)) {
      toast.warning(`Please ensure you've entered a valid container ID.`, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'invalid-container-id',
      });

      return;
    }

    const shipmentTitle = createShipmentTitle(carrierScac, containerId);

    if(shipments.find(item => item.carrierScac === carrierScac && item.containerId === containerId)) {
      toast.warning(`You're already tracking shipment ${shipmentTitle}.`, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: `duplicate-entry-${shipmentTitle}`,
      });

      return;
    }

    await postShipment(editedFormInputs);
    toast.success(`Shipment ${shipmentTitle} created.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    refreshShipments();
    setFormInputs(formInputDefaults);
  }

  return (
    <div
      id="create-shipment-form"
      className={`shipment-list-item ${formInputs.isActive ? 'active' : 'inactive'}`}
    >
      <form onSubmit={createShipment}>
        <h2>
          New Shipment
        </h2>
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
        <br />
        <label>
          Active:
          <input
            type="checkbox"
            name="isActive"
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
