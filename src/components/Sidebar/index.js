import React, {useState, useEffect} from 'react';
import geomToWKT from '../../utils/GeomToWKT';
import './style.css';

function Sidebar({points, setCurrentPolygon, landmark, relations}){
    const [wkt, setWkt] = useState("");
    const {pointsArray, setPointsArray} = points;
    const {currentLandmark, setCurrentLandmark, landmarkName, landmarkRef} = landmark;
    const {spatialRelations, currentSR, setCurrentSR} = relations;

    useEffect(() => {
        setWkt(geomToWKT(pointsArray));
    }, [pointsArray]);

    const reset = () => {
        setPointsArray([[]]);
        setCurrentPolygon(0);
    }

    return (
        <aside>
            <form>
                <label htmlFor='wktTextField'><h2>Relações Espaciais</h2></label>
                <textarea id='wktTextField' rows='20'
                 placeholder='Tutorial de como desenhar vai aqui' value={wkt} readOnly>
                </textarea>
            </form>
            
            <p>
                <h2>Sua carona lhe espera em:</h2>
                {
                    (currentSR === 0) && 
                    <h3><em className="text-em">NA RUA DE</em> {landmarkName} <em className="text-em">PERTO DE</em> {landmarkRef}</h3>
                }

                {
                    (currentSR != 0) &&
                    <h3><em className="text-em">{spatialRelations[currentSR]}</em> {landmarkName}</h3>

                }
            </p>

            <div className="controlButtons">
                <button className="btn reset" onClick={reset}>
                    Reiniciar Desenho
                </button>

                <button className="btn next" onClick={() => {
                    if(currentLandmark < 3){
                        setCurrentLandmark(currentLandmark+1);
                    }else{
                        setCurrentLandmark(0);
                        setCurrentSR(currentSR + 1);
                    }
                    reset();
                }} disabled={currentLandmark===3 && currentSR===4}>
                    Próxima
                </button> 
            </div>
        </aside>
    );

};

export default Sidebar;