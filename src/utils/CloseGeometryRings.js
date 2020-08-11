function CloseGeometryRings(pointsArray){
    return pointsArray.map((polygon) => {
        const firstPoint = polygon[0];
        const lastPoint = polygon[polygon.length - 1];

        if(!(firstPoint.lat === lastPoint.lat && firstPoint.lng === lastPoint.lng)){
            return [...polygon, polygon[0]];
        }else{
            return polygon;
        }

    });
}

export default CloseGeometryRings;