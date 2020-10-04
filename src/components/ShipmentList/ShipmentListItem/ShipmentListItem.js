import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import ShipmentPropType from '../shipmentPropType';
import { createShipmentTitle, formatDate } from '../helpers';
import { changeActiveStatus, deleteShipment } from '../../../api';

import './ShipmentListItem.scss';

export default function ShipmentListItem({
  shipment: { id, carrierScac, containerId, createdAt, isActive },
  refreshShipments,
}) {
  const shipmentTitle =  createShipmentTitle(carrierScac, containerId);
  const MarkInactiveButton = () => (
    <button className="pure-button" onClick={markInactive}>Mark Inactive</button>
  );

  const MarkActiveButton = () => (
    <button className="pure-button" onClick={markActive}>Mark Active</button>
  );

  async function markInactive() {
    await changeActiveStatus(id, { isActive: false });
    toast.success(`Shipment ${shipmentTitle} marked inactive.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    refreshShipments();
  }

  async function markActive() {
    await changeActiveStatus(id, { isActive: true });
    toast.success(`Shipment ${shipmentTitle} marked active.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    refreshShipments();
  }

  async function removeShipment() {
    await deleteShipment(id);
    toast.success(`Shipment ${shipmentTitle} deleted.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    refreshShipments();
  }

  return (
    <li className={`shipment-list-item ${isActive ? 'active' : 'inactive'}`}>
      <h2>
        {shipmentTitle}
      </h2>
      <p>Created {formatDate(createdAt)}</p>
      <div className="two-button-container">
        {isActive ? <MarkInactiveButton /> : <MarkActiveButton />}
        <button className="pure-button" onClick={removeShipment}>Delete</button>
      </div>
    </li>
  );
}

ShipmentListItem.propTypes = {
  shipment: ShipmentPropType,
  refreshShipments: PropTypes.func,
}
