function geomToWKT(pointsArray){
    let newWkt;
        if(pointsArray.length === 1 && pointsArray[0].length === 0){
            newWkt = "";
        }
        else if(pointsArray.length === 1){
            if(pointsArray[0].length === 1){
                newWkt = `POINT(${pointsArray[0][0].lat} ${pointsArray[0][0].lng})`;
            }else{
                const firstPoint = pointsArray[0][0];
                const lastPoint = pointsArray[0][pointsArray[0].length - 1];
                if (firstPoint.lat === lastPoint.lat && firstPoint.lng === lastPoint.lng)  {
                newWkt = "POLYGON(";
                }else{
                newWkt = "LINESTRING(";
                }
                pointsArray[0].map(point => newWkt += `${point.lat} ${point.lng},`);
                newWkt = newWkt.replace(/.$/,")");
            }
        }else if(pointsArray.length > 1){
            newWkt = "MULTIPOLYGON(";
            pointsArray.map(polygon => {
                newWkt += "((";
                polygon.map(point => newWkt += `${point.lat} ${point.lng},`);
                newWkt = newWkt.replace(/.$/,")),");
            });
            newWkt = newWkt.replace(/.$/,")");
        }

        return newWkt;
};

export default geomToWKT;