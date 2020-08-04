import React, { useState, useEffect } from 'react';
import { Map, CircleMarker, Polyline, TileLayer } from 'react-leaflet'
import './App.css';

function App() {
  const [centralPoint] = useState([-7.2281, -35.8739]);
  const [pointsArray, setPointsArray] = useState([[]]);
  const [zoom] = useState(18.5);
  const [isCircleEvent, setIsCircleEvent] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState(0);
  const [wkt, setWkt] = useState("");

  useEffect(() => {
    if(pointsArray[currentPolygon].length > 1){
      const firstPoint = pointsArray[currentPolygon][0];
      const lastPoint = pointsArray[currentPolygon][pointsArray[currentPolygon].length - 1];
      if (firstPoint.lat === lastPoint.lat && firstPoint.lng === lastPoint.lng)  {
        setCurrentPolygon(currentPolygon + 1);
      };
    }

    if(pointsArray.length === 1){
      setWkt(`POINT(${pointsArray[0].lat} ${pointsArray[0].lng})`);
    }else if(pointsArray.length === 2){
      setWkt(`LINESTRING(${pointsArray[0].lat} ${pointsArray[0].lng}, ${pointsArray[1].lat} ${pointsArray[1].lng})`);
    }else if(pointsArray.length > 2){
      let newWkt = "POLYGON(";

      pointsArray.map(point => newWkt += `${point.lat} ${point.lng},`);
      setWkt(newWkt.replace(/.$/,")"));
    }
  }, [pointsArray])

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
      <Map  center={centralPoint} 
            zoom={zoom}
            maxZoom={20}
            onclick={handleClick}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        <ul>
        {
          pointsArray.map(polygon =>
            polygon.map((point, ind) =>
              <li key={ind}>
                <CircleMarker
                  center={[point.lat, point.lng]}
                  radius={5} weight={2} color="#ef5350"
                  onclick={(e) => {
                    if(point === pointsArray[currentPolygon][0]){
                      handleClick(e);
                    }else{
                      setPointsArray(pointsArray.map(polygon => polygon.filter(p => p !== point)));
                    }
                    setIsCircleEvent(true);
                  }}
                  >
                </CircleMarker>
              </li>
            )
          )
        }
        </ul>

        <ul>
        {
          pointsArray.map(polygon =>
            polygon.map((point, ind) => 
            (polygon.length > 1) &&
              <li key={ind}>
              <Polyline 
                positions={polygon.map(point => [point.lat, point.lng])}
                color="#ef5350"
                >
              </Polyline>
              </li>
            )
          )
        }
        </ul>

        <button  className="reset" onClick={() => {
            setPointsArray([[]]);
            setCurrentPolygon(0);
          }}>
            Resetar
        </button>                
      </Map>

     <aside>
      <form>
        <label htmlFor='wktTextField'><h2>WKT Representation of the Polygon</h2></label>
        <textarea id='wktTextField' rows='20' placeholder='Click on the map to start drawing your polygon' value={wkt} readOnly>
        </textarea>
      </form>
     </aside>
    </div>
  );
}

export default App;
