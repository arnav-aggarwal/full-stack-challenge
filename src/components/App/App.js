import React, { useEffect, useState } from "react";
import { getShipments } from "../../api";
import ShipmentList from "../ShipmentList";
import logo from "./logo.svg";
import "./App.scss";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [shipments, setShipments] = useState([]);

  // Make fetching function available outside the effect so it can be used for refetching
  // See `onRefreshClick` prop on ShipmentList. You could use this logic to reload the list on successful
  // new shipment form submissions.
  async function loadShipments() {
    setIsLoading(true);
    const result = await getShipments();
    setShipments(result);
    setIsLoading(false);
  }

  // Fetch initial shipment data
  useEffect(() => {
    loadShipments();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a className="App-link" href="/">
          Shipments
        </a>
      </header>
      <div id="main">
        <h1>Current Shipments</h1>
        {isLoading ? (
          <p className="App-loading-message">Loading...</p>
        ) : (
          <ShipmentList shipments={shipments} refreshShipments={loadShipments} />
        )}
      </div>
    </div>
  );
}

export default App;
