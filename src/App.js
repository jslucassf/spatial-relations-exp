import React, { useState, useEffect } from 'react';
import { Map, CircleMarker, Polyline, TileLayer } from 'react-leaflet'
import './App.css';
import MapComp from './components/MapComp';
import Sidebar from './components/Sidebar';
import data from './data/landmarks.json';

function App() {
  const [centralPoint, setCentralPoint] = useState([ -7.2238664, -35.8793534 ]);
  const [pointsArray, setPointsArray] = useState([[]]);
  const [isCircleEvent, setIsCircleEvent] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState(0);
  const [landmarks] = useState(data);
  const [currentLandmark, setCurrentLandmark] = useState(0);
  const [spatialRelations] = useState([
    "NA RUA - PERTO DE",
    "NA FRENTE DE",
    "À DIREITA DE",
    "AO LADO DE",
    "ENTRE"
  ]);
  const [currentSR, setCurrentSR] = useState(0);

  useEffect(() => {
    setCentralPoint(landmarks[currentLandmark].properties.center.slice().reverse());
  }, [currentLandmark]);

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
        center: centralPoint,//[-7.2281, -35.8739],
        zoom:19.4
      }} 
      points= {{pointsArray,setPointsArray}}
      polygon={{currentPolygon, setCurrentPolygon}}
      landmark={landmarks[currentLandmark]}>
      </MapComp>

      <Sidebar points={{pointsArray, setPointsArray}}
              setCurrentPolygon={setCurrentPolygon}
              landmark={{currentLandmark, setCurrentLandmark, 
                        landmarkName: landmarks[currentLandmark].properties.name,
                        landmarkRef: landmarks[currentLandmark].properties.ref}}
              relations={{spatialRelations, currentSR, setCurrentSR}}
              >
      </Sidebar>
    </div>
     
  );
}

export default App;
