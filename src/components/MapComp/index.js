import React, { useState, useEffect, useRef } from 'react';
import { Map, CircleMarker, Polyline, Polygon, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import './style.css';

function MapComp( { mapOptions, points, polygon, landmark, reset } ){
  const [isCircleEvent, setIsCircleEvent] = useState(false);
  const {pointsArray, setPointsArray} = points;
  const {currentPolygon, setCurrentPolygon} = polygon;
  const btnRef = useRef(null);
  
  useEffect(() => {
    if(btnRef.current) L.DomEvent.disableClickPropagation(btnRef.current);
  });

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
                      handleClick(e);
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
            pointsArray.map((polygon, ind) =>
              (polygon.length > 1 && ind === currentPolygon)?   
                <li key={ind}>
                  <Polyline 
                    positions={polygon.map(point => [point.lat, point.lng])}
                    color="#ef5350"
                    >
                  </Polyline>
                </li> :
                <li key={ind}>
                  <Polygon
                    positions={polygon.map(point => [point.lat, point.lng])}
                    color="#ef5350"
                    >
                  </Polygon>
                </li>
            )
          }
          </ul>          

          <div className="controlButtons" ref={btnRef}>
            <button className="btn new-geom" onClick={(e) => {
              if(pointsArray[currentPolygon]) {
                const firstPoint = pointsArray[currentPolygon][0];
                const lastPoint = pointsArray[currentPolygon][pointsArray[currentPolygon].length - 1];
                if(!(firstPoint.lat === lastPoint.lat && firstPoint.lng === lastPoint.lng)){
                  setPointsArray([...pointsArray.slice(0, -1), pointsArray.slice(-1)[0].concat(pointsArray[currentPolygon][0])]);
                }
                setCurrentPolygon(currentPolygon + 1);
              }
            }}>
                Adicionar Outro Desenho
            </button>

            <button className="btn reset" onClick={reset}>
                Limpar Desenho
            </button>
          </div>
      </Map>        
    );
}

export default MapComp;