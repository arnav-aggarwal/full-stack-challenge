import PropTypes from 'prop-types';

const ShipmentPropType = PropTypes.shape({
  id: PropTypes.string,
  containerId: PropTypes.string,
  carrierScac: PropTypes.string,
  isActive: PropTypes.bool,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
});

export default ShipmentPropType;
