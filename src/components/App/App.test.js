import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('app', () => {
  test('renders shipment list', () => {
    const { container } = render(<App />);
    const shipmentList = container.querySelector(".shipment-list");
    expect(shipmentList).toBeDefined();
  });
})
