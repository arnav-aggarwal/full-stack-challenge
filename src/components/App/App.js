import React, { useEffect, useState } from 'react';
import { ToastContainer, Slide } from 'react-toastify';

import { getShipments } from '../../api';
import ShipmentList from '../ShipmentList';
import logo from './logo.svg';

import './App.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import 'purecss/build/buttons-min.css';

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
    <div id="app">
      <header id="app-header">
        <img src={logo} id="app-logo" alt="logo" />
        <a id="app-link" href="/">
          Shipments
        </a>
      </header>
      <div id="main-container">
        {isLoading ?
          <h1>Loading...</h1> :
          <h1>Current Shipments</h1>
        }
        <ShipmentList shipments={shipments} refreshShipments={loadShipments} />
      </div>
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
