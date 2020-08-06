import React, { useState, useEffect } from 'react';
import { Map, CircleMarker, Polyline, TileLayer, GeoJSON } from 'react-leaflet';
import './style.css';

function MapComp( { mapOptions, points, polygon, landmark } ){
  const [isCircleEvent, setIsCircleEvent] = useState(false);
  const {pointsArray, setPointsArray} = points;
  const {currentPolygon, setCurrentPolygon} = polygon;

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
  };

  useEffect(() => {
      if(pointsArray[currentPolygon].length > 1){
        const firstPoint = pointsArray[currentPolygon][0];
        const lastPoint = pointsArray[currentPolygon][pointsArray[currentPolygon].length - 1];
        if (firstPoint.lat === lastPoint.lat && firstPoint.lng === lastPoint.lng)  {
          setCurrentPolygon(currentPolygon + 1);
        };
      }
    }, [pointsArray]);

  return (
      <Map  center={mapOptions.center} zoom={mapOptions.zoom} maxZoom={20} onclick={handleClick}>
          <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />

          { landmark &&
          <GeoJSON key={landmark.id} data={landmark}/>
          }
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
      </Map>        
    );
}

export default MapComp;