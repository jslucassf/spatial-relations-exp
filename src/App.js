import React, { useState, useEffect } from 'react';
import { Map, CircleMarker, Polyline, TileLayer } from 'react-leaflet'
import './App.css';
import MapComp from './components/MapComp';
import Sidebar from './components/Sidebar';

function App() {
  const [pointsArray, setPointsArray] = useState([[]]);
  const [isCircleEvent, setIsCircleEvent] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState(0);

  const handleClick = (event) => {
    if(!isCircleEvent){
      const coords = event.latlng;

      if(currentPolygon === pointsArray.length - 1){
        setPointsArray([...pointsArray.slice(0, -1), pointsArray.slice(-1)[0].concat(coords)]);
      }else{
        setPointsArray([...pointsArray, [coords]]);
      }
    }
    setIsCircleEvent(false);
  }

  return (
    <div className='container'>
      <MapComp 
      mapOptions = {{
        center:[-7.2281, -35.8739],
        zoom:18.5
      }} 
      points= {{pointsArray,setPointsArray}}
      polygon={{currentPolygon, setCurrentPolygon}}>
      </MapComp>

      <Sidebar pointsArray={pointsArray}>
      </Sidebar>
    </div>
     
  );
}

export default App;
