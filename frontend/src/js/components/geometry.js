function degreesToRadians(degrees){
    return degrees * Math.PI / 180;
}

function radiansToDegrees(radians){
    return radians * 180/Math.PI;
}

const EARTH_RADIUS_METERS = 6378137.0;
//modified from scripts shared from
//http://www.movable-type.co.uk/scripts/latlong.html
function distanceFrom(prevCoordinate, nextCoordinate){
    let phi_1 = degreesToRadians(prevCoordinate.lat);
    let phi_2 = degreesToRadians(nextCoordinate.lat);
    //delta change between latitude and longitude points as radians
    let delta_phi = degreesToRadians(nextCoordinate.lat - prevCoordinate.lat);
    let delta_lambda = degreesToRadians(nextCoordinate.lng - prevCoordinate.lng);
    //square of half a chord length between points
    //sin²(Δφ) + cos(φ₁).cos(φ₂).sin²(Δλ)
    let a = Math.sin(delta_phi/2) * Math.sin(delta_phi/2)
        + Math.cos(phi_1) * Math.cos(phi_2)
        * Math.sin(delta_lambda/2) * Math.sin(delta_lambda/2);
    //angular distance (radians);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    //distance in meters
    let d = EARTH_RADIUS_METERS * c;
    return d;
}

function getBearing(prevCoordinate,nextCoordinate){
    console.log(prevCoordinate,nextCoordinate);
    let phi_1 = degreesToRadians(prevCoordinate.lat);
    let phi_2 = degreesToRadians(nextCoordinate.lat);
    let delta_lambda = degreesToRadians(nextCoordinate.lng)
                            - degreesToRadians(nextCoordinate.lng);
    let y = Math.sin(delta_lambda) * Math.cos(phi_2);
    let x = (Math.cos(phi_1) * Math.sin(phi_2))
                - (Math.sin(phi_1) * Math.cos(phi_2) * (Math.cos(delta_lambda)));
    let theta = Math.atan2(y,x);
    let bearing = radiansToDegrees(theta) % 360;
    return bearing;
}

function getCoordinateFromBearingDistance(coordinate, bearing, meters){
    let phi = degreesToRadians(coordinate.lat);
    let lambda = degreesToRadians(coordinate.lng);
    let delta = meters/EARTH_RADIUS_METERS; //angular distance
    let phi_i = Math.asin((Math.sin(phi) * Math.cos(delta))
                            + (Math.cos(phi) * Math.sin(delta) * Math.cos(bearing)));
    let lambda_i = lambda + (Math.atan2(Math.sin(bearing) * Math.sin(delta) * Math.cos(phi)
                                , Math.cos(delta) - Math.sin(phi) * Math.sin(phi)));
    let lat = radiansToDegrees(phi_i);
    let lng = radiansToDegrees(lambda_i);
    return {lat: lat, lng: lng};
}

//distance is a Distance object, path is a Polyline object
export function getCoordinateAtDistance(totalDistance, path){
    console.log('START GETCOORDINATEATDISTANCE',totalDistance,path);
    let meters = totalDistance;
    let currDistance = 0;
    let prevDistance = 0;
    let i = 1;
    if (meters == 0) return path[0];
    if (meters < 0 || path.length < 2) return null;
    while (i < path.length && currDistance < meters){
        prevDistance = currDistance;
        currDistance += distanceFrom(path[i-1],path[i]);//from prevCoordinate to nextCoordinate
        i++;
    }
    if (currDistance < meters) return null; //the point extends beyond the path
    console.log('getting Bearing', path[i-2],path[i-1]);
    let prevCoordinate = path[i-2];
    let nextCoordinate = path[i-1];
    let metersFromPrevCoordinate = meters - prevDistance; 
    let bearing = getBearing(prevCoordinate, nextCoordinate);
    
    return getCoordinateFromBearingDistance(prevCoordinate, bearing, metersFromPrevCoordinate);
}

export function getCoordinatesAtDistances(distances, paths){
    let coordinates = [];
    if (distances.length != paths.length)
        throw Error("there must be the same number of distances and paths");

    for (let i = 0; i < paths.length; i++){
        coordinates.push(getCoordinateAtDistance(distances[i], paths[i]));
    }
    return coordinates;
}