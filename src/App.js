import React, { useState, useEffect } from 'react';
import './App.css';
import MapComp from './components/MapComp';
import Sidebar from './components/Sidebar';
import data from './data/landmarks.json';

function App() {
  const [centralPoint, setCentralPoint] = useState([ -7.2238664, -35.8793534 ]);
  const [pointsArray, setPointsArray] = useState([[]]);
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
    if(currentSR === 0){
      setCentralPoint(landmarks[currentLandmark].properties.center_near.slice().reverse());
    }else{
      setCentralPoint(landmarks[currentLandmark].properties.center.slice().reverse());
    }
  }, [currentLandmark]);

  const reset = () => {
    setPointsArray([[]]);
    setCurrentPolygon(0);
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
      landmark={landmarks[currentLandmark]}
      reset={reset}>
      </MapComp>

      <Sidebar
              landmark={{currentLandmark, setCurrentLandmark, 
                        landmarkName: landmarks[currentLandmark].properties.name,
                        landmarkRef: landmarks[currentLandmark].properties.ref}}
              relations={{spatialRelations, currentSR, setCurrentSR}}
              reset={reset}>
      </Sidebar>
    </div>
     
  );
}

export default App;
