//this function decodes a polyline and returns coordinates (array of LatLng object)
//this function decodes a polyline and returns coordinates (array of LatLng object)
const RETURN_TYPE = {LAT_LNG_ARR:0,VECTOR_ARR:1,VECTOR:2,POINT_ARR:3,PT_LSTR:4,IS_IN: 5};
const ACCURACY_EXPONENT = 5;
export function decodePolyline(polyline, returnType = RETURN_TYPE.LAT_LNG_ARR){
    //console.log(polyline);
    const accuracyMultiplier = Math.pow(10, ACCURACY_EXPONENT);
    let coordinates = [];

    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < polyline.length){
        let char;
        let shift = 0;
        let result = 0;

        //get 1 coordinate at a time (lat then lng)
        function getCoordinate(){
            do {
                //dart: int codeUnitAt(int index) returns UTF-16 code unit at index
                char = polyline.charCodeAt(index++) - 63;
                result |= (char & 0x1f) << shift;
                shift += 5;
            } while(char >= 0x20);

            const value = result >> 1;
            //negative values: add 1, binary inversion
            const coordinateChange = (result & 1) != 0 ? (~value) : value;

            //clear shift and result
            shift = result = 0;

            return coordinateChange;
        }

        lat += getCoordinate();
        lng += getCoordinate();
        let _lat = lat / accuracyMultiplier;
        let _lng = lng / accuracyMultiplier;
        // if (returnType == RETURN_TYPE.VECTOR){
        //     coordinates.push([_lat,_lng]);
        // }
        // else if (returnType == RETURN_TYPE.POINT_ARR)
        // {
        //     coordinates.push({x: _lat, y: _lng});
        // }
        // else if (returnType == RETURN_TYPE.PT_LSTR){
        //     coordinates.push(`pt(${_lat},${_lng}),`);
        // }
        /* else*/ if (returnType == RETURN_TYPE.IS_IN){
            coordinates.push(`is_in(${_lat},${_lng});`);
        }
        else {
            coordinates.push({lat: _lat, lng: _lng });
        }
    }
    if (returnType == /*RETURN_TYPE.PT_LSTR||*/RETURN_TYPE.IS_IN){
        return coordinates.join('').replace(/,$/,')');
    }
    //console.log('in decode: should output latlngarr',coordinates);
    return coordinates;
}

export function decodePolylines(polylines){
    
    return polylines.map(polyline => decodePolyline(polyline));
}