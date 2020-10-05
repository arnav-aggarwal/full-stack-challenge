import React from "react";
import { render, screen } from "@testing-library/react";
import CreateShipmentForm from "./CreateShipmentForm";

const shipments = [
  {
    id: "d85fdc7b-813a-4c52-95a8-0d9d726f2852",
    containerId: "TGHU9127781",
    carrierScac: "MAEU",
    isActive: true,
    createdAt: "2020-09-27T07:17:27.685Z",
    updatedAt: "2020-09-27T07:17:27.685Z",
  },
  {
    id: "3103bfde-ea57-4160-ad43-5b3ce1f8ec1c",
    containerId: "APHU7369949",
    carrierScac: "CMDU",
    isActive: false,
    createdAt: "2020-09-27T07:17:27.686Z",
    updatedAt: "2020-09-27T07:17:27.686Z",
  },
];

describe('CreateShipmentForm', () => {
  test('renders the create shipment form', () => {
    render(
      <CreateShipmentForm
        shipments={shipments}
        refreshShipments={() => {}}
        hideCreateShipmentForm={() => {}}
      />
    );

    expect(screen.getByPlaceholderText('Carrier SCAC')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Container ID')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
