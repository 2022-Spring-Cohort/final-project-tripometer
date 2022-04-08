//this function decodes a polyline and returns coordinates (array of LatLng object)
const ACCURACY_EXPONENT = 5;
export function decodePolyline(polyline){
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

        coordinates.push({lat: lat / accuracyMultiplier, lng: lng / accuracyMultiplier });
    }

    return coordinates;
}

export function decodePolylines(polylines){
    return polylines.map(polyline => decodePolyline(polyline));
}