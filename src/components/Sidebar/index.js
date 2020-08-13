import React from 'react';
import './style.css';

function Sidebar({landmark, relations, reset, finishGeom, isDrawingValid, setAppState}){
    const {currentLandmark, setCurrentLandmark, landmarkName, landmarkNearRef, landmarkBetweenRef} = landmark;
    const {spatialRelations, currentSR, setCurrentSR} = relations;

    return (
        <aside>
            <div id="instructions">
                <label htmlFor='wktTextField'><h2>Instruções</h2></label>
                <p className="instructionsText">1. Desenhe clicando no mapa</p>
                <p className="instructionsText">2. Errou? Você pode limpar o desenho clicando em 'Limpar Desenho'</p>
                <p className="instructionsText">3. Se precisar desenhar mais de uma forma, clique em 'Adicionar outro desenho'
                    quando tiver terminado a primeira e continue</p>
                <p className="instructionsText">4. Terminou? Apenas clique em 'Próxima'</p>
                <p className="instructionsText" style={{color: "#e74c3c"}}>OBS: O mapa pode demorar um pouco para carregar</p>
            </div>
            
            <div id="sentence">
                <h2>Sua carona lhe espera em:</h2>
                {
                    (currentSR === 0) && 
                    <h3><em className="text-em">NA RUA DE</em> {landmarkName}, <em className="text-em">PERTO DE</em> {landmarkNearRef}</h3>
                }
                {
                    (currentSR === 4) &&
                    <h3><em className="text-em">ENTRE </em> {landmarkName} <em className="text-em">E</em> {landmarkBetweenRef}</h3>
                }
                {
                    (currentSR === 1 || currentSR === 2 || currentSR === 3) &&
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
                            
                            if(currentLandmark === 3 && currentSR === 4){
                                setAppState("finished");
                            }
                            
                            reset();
                        }
                    }else{
                        window.alert("Desenhe clicando no mapa")
                    }
                }} disabled={currentLandmark===4 && currentSR===4}>
                    Próxima
                </button>
            </div>
        </aside>
    );

};

export default Sidebar;