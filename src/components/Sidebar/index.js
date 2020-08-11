import React from 'react';
import './style.css';

function Sidebar({landmark, relations, reset, finishGeom, isDrawingValid}){
    const {currentLandmark, setCurrentLandmark, landmarkName, landmarkRef} = landmark;
    const {spatialRelations, currentSR, setCurrentSR} = relations;

    return (
        <aside>
            <form>
                <label htmlFor='wktTextField'><h2>Relações Espaciais</h2></label>
                <textarea id='wktTextField' rows='20'
                 placeholder='Tutorial de como desenhar vai aqui' readOnly>
                </textarea>
            </form>
            
            
                <h2>Sua carona lhe espera em:</h2>
                {
                    (currentSR === 0) && 
                    <h3><em className="text-em">NA RUA DE</em> {landmarkName} <em className="text-em">PERTO DE</em> {landmarkRef}</h3>
                }

                {
                    (currentSR !== 0) &&
                    <h3><em className="text-em">{spatialRelations[currentSR]}</em> {landmarkName}</h3>
                }
            

            <button className="btn next" onClick={() => {
                if(isDrawingValid()){
                    if(window.confirm("Você terminou o desenho?")){
                        
                        if(currentLandmark < 3){
                            setCurrentLandmark(currentLandmark+1);
                        }else{
                            setCurrentLandmark(0);
                            setCurrentSR(currentSR + 1);
                        }
                        finishGeom();
                        reset();
                    }
                }else{
                    window.alert("Desenhe clicando no mapa")
                }
            }} disabled={currentLandmark===3 && currentSR===4}>
                Próxima
            </button>
        </aside>
    );

};

export default Sidebar;