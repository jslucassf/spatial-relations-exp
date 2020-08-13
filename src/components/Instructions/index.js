import React from 'react';
import DrawingGif from './../../assets/gifs/drawing.gif';
import ClearDrawingGif from './../../assets/gifs/clear-drawing.gif';
import MultiPolygonGif from './../../assets/gifs/multi-polygon.gif';
import NextGif from './../../assets/gifs/next.gif';
import './style.css';

function Instructions({setAppState}) {
    return (
    <div className="mainContainer">
        <div className="startingText">
            <div className="instructionsText">
                <h3>Imagine que um amigo vai lhe dar carona e lhe diz por telefone onde parou o carro para te esperar. <br></br>
                    Com base na descrição que ele passou, pedimos que desenhe no mapa a área onde acha possível que sua carona esteja.</h3>
            </div>
        </div>
        <div className="instructionsContainer">
            <div>
                <h3 className="instructionsText">1. Desenhe clicando no mapa</h3>
                <img src={DrawingGif} alt="Desenhe clicando no mapa"/>
            </div>
            <div>
                <h3 className="instructionsText">2. Errou? Você pode limpar o desenho clicando em 'Limpar Desenho'</h3>
                <img src={ClearDrawingGif} alt="Limpar desenho reinicia a área de desenho"/>
            </div>
            <div>
                <h3 className="instructionsText">3. Se precisar desenhar mais de uma forma, clique em 'Adicionar outro desenho'
                    quando tiver terminado a primeira e continue</h3>
                <img src={MultiPolygonGif} alt="Adicionar outro desenho permite que desenhe mais formas"/>
            </div>
            <div>
                <h3 className="instructionsText">4. Terminou? Apenas clique em 'Próxima'</h3>
                <img src={NextGif} alt="Próxima passa para próxima situação"/>
            </div>
        </div>
        <button className="start" onClick={() => setAppState("initialized")}>
            Começar
        </button>
    </div>
    );
}

export default Instructions;