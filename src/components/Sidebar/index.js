import React, {useState, useEffect} from 'react';
import geomToWKT from '../../utils/GeomToWKT';
import './style.css';

function Sidebar({pointsArray}){
    const [wkt, setWkt] = useState("");

    useEffect(() => {
        setWkt(geomToWKT(pointsArray));
    }, [pointsArray]);

    return (
        <aside>
            <form>
                <label htmlFor='wktTextField'><h2>Relações Espaciais</h2></label>
                <textarea id='wktTextField' rows='20' placeholder='Clique no mapa para começar a desenhar a relação' value={wkt} readOnly>
                </textarea>
            </form>
        </aside>
    );

};

export default Sidebar;