import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Instructions from './components/Instructions';
import MapComp from './components/MapComp';
import Sidebar from './components/Sidebar';
import ThankYou from './components/ThankYou';
import data from './data/landmarks.json';
import CloseGeometryRings from './utils/CloseGeometryRings';

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
  const [resultGeometries, setResultGeometries] = useState({rua_perto: [], frente: [], direita: [], lado: [], entre: []});
  const [appState, setAppState] = useState("tutorial");
  const [userID, setUserID] = useState();

  useEffect(() => {
    async function touchApi(){
      const resp = await axios.get("http://localhost:3003/next-id");
      setUserID(resp.data.id);
    }

    touchApi();

  }, [])

  useEffect(() => {
    if(currentSR === 0){
      setCentralPoint(landmarks[currentLandmark].properties.center_near.slice().reverse());
    }else if(currentSR === 4){
      setCentralPoint(landmarks[currentLandmark].properties.center_between.slice().reverse());
    }
    else{
      setCentralPoint(landmarks[currentLandmark].properties.center.slice().reverse());
    }
  }, [currentLandmark]);

  const reset = () => {
    setPointsArray([[]]);
    setCurrentPolygon(0);
  };

  const isDrawingValid = () => {
    return !([...pointsArray].map(polygon => polygon.length > 1).includes(false));
  }

  const  finishGeom = async () =>{
    const resultsCopy = JSON.parse(JSON.stringify(resultGeometries));
    
    const closedGeoms = CloseGeometryRings(pointsArray);
    switch(currentSR){
      case 0:
      resultsCopy.rua_perto.push(closedGeoms);
      break;
      case 1: 
      resultsCopy.frente.push(closedGeoms);
      break;
      case 2: 
      resultsCopy.direita.push(closedGeoms);
      break;
      case 3: 
      resultsCopy.lado.push(closedGeoms);
      break;
      case 4: 
      resultsCopy.entre.push(closedGeoms);
      break;
      default:
        break;
    }
    const drawing = {
      "userID": userID,
      "relation": spatialRelations[currentSR],
      "landmark": landmarks[currentLandmark].properties.name,
      "geometry": {
        "type": (pointsArray.length > 1) ? "MultiPolygon" : "Polygon",
        "coordinates": pointsArray
      }
    }

    await axios.post("http://localhost:3003/saveDrawing", drawing);
    setResultGeometries(resultsCopy);
  };

  return (
    <div className='container'>
      {
        appState === "tutorial" &&
        <Instructions setAppState={setAppState}></Instructions>
      }
      {
        appState === 'initialized' &&
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
      }
      {
        appState === 'finished' &&
        <ThankYou></ThankYou>
      }
      {
        (appState === 'initialized' || appState === 'finished') &&
        <Sidebar
          landmark={{currentLandmark, setCurrentLandmark, 
                    landmarkName: landmarks[currentLandmark].properties.name,
                    landmarkNearRef: landmarks[currentLandmark].properties.ref,
                    landmarkBetweenRef: landmarks[currentLandmark].properties.ref_between}}
          relations={{spatialRelations, currentSR, setCurrentSR}}
          reset={reset}
          finishGeom={finishGeom}
          isDrawingValid={isDrawingValid}
          setAppState={setAppState}>
        </Sidebar>
      }
    </div>
     
  );
}

export default App;
