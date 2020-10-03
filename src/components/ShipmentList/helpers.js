export function createShipmentTitle(scac, containerId) {
  return `${scac} / ${formatContainerId(containerId)}`;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString();
}

export function validateContainerId(id) {
  return /^[A-Z]{3}(U|J|Z)\d{7}$/.test(cleanContainerId(id));
}

export function cleanContainerId(id) {
  return id.replace(/-/g, '');
}

export function validateScac(scac) {
  return /^[A-Z]{2,4}$/.test(scac);
}

export function formatContainerId(id) {
  return `${id.slice(0, 4)}-${id.slice(4, -1)}-${id.slice(-1)}`
}
