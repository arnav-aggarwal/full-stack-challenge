import React from "react";
import { render } from "@testing-library/react";
import ShipmentList from "./ShipmentList";

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
    isActive: true,
    createdAt: "2020-09-27T07:17:27.686Z",
    updatedAt: "2020-09-27T07:17:27.686Z",
  },
];

test("renders a list of shipments", () => {
  const { getByText } = render(
    <ShipmentList shipments={shipments} />
  );
  const firstShipment = getByText(/TGHU-912778-1/i);
  const secondShipment = getByText(/APHU-736994-9/i);
  expect(firstShipment).toBeDefined();
  expect(secondShipment).toBeDefined();
});
