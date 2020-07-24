import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './App.css';

function App() {
  const [centralPoint, setCentralPoint] = useState([-7.2281, -35.8739]);
  const [zoom, setZoom] = useState(18);
  return (
    <div class='container'>
      <Map center={centralPoint} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={centralPoint}>
        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
      </Marker>
      </Map>
     <aside>
      <form>
        <label for='wktTextField'><h2>WKT Representation of the Polygon</h2></label>
        <textarea id='wktTextField' rows='20' placeholder='Click on the map to start drawing your polygon'>Teste</textarea>
      </form>
     </aside>
    </div>
  );
}

export default App;
