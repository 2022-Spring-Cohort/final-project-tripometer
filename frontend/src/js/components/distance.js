const METERS_PER_MILE = 1609.34;
const METERS_PER_FOOT = 0.3048;
const METERS_PER_KILOMETER = 1000;
const METERS_PER_TENTH_MILE = 160.934; //display ft below this distance instead of mi
const METERS_PER_TENTH_KILOMETER = 100; //display m below this distance instead of km

export class Distance{
    static Units = {MILES:'mi',FEET:'ft',KILOMETERS:'km',METERS:'m'};
    static UnitSystem = {METRIC: 0, IMPERIAL: 1};
    static #parser = /(?<value>\d+(?:\.\d+)?)\s(?<unit>mi|ft|km|m)/;
    static convertMilesToMeters(miles){
        return miles * METERS_PER_MILE;
    }
    static convertMetersToMiles(meters){
        return meters / METERS_PER_MILE;
    }
    static convertFeetToMeters(feet) {
        return feet * METERS_PER_FOOT;
    }
    static convertMetersToFeet(meters) {
        return meters / METERS_PER_FOOT;
    }
    static convertKilometersToMeters(kilometers){
        return kilometers * METERS_PER_KILOMETER;
    }
    static convertMetersToKilometers(meters){
        return meters / METERS_PER_KILOMETER;
    }
    static parseDistance(distanceString){
        const { groups: {value, unit} } = this.#parser.exec(distanceString);
        value = parseFloat(value);
        switch (unit.toLowerCase()){
            case Distance.Units.MILES:
                return new Distance(Distance.convertMilesToMeters(value),1);
            case Distance.Units.FEET:
                return new Distance(Distance.convertFeetToMeters(value),1);
            case Distance.Units.KILOMETERS:
                return new Distance(Distance.convertKilometersToMeters(value),0);
            case Distance.Units.METERS:
                return new Distance(value,0);
        }
        //throw new Error(`Unsupported unit: "${unit}".`);
    }

    get text(){
        switch (unitSystem){
            case Distance.UnitSystem.METRIC: {
                if (value < METERS_PER_TENTH_KILOMETER)
                    return Math.round(this.value) + Distance.Units.METERS;
                else
                    return Math.round(Distance.convertMetersToKilometers(this.value) * 10)/10 + Distance.Units.KILOMETERS;
            }
            case Distance.UnitSystem.IMPERIAL: {
                if (value < METERS_PER_TENTH_MILE) //below 160.934 m (0.1 miles), use feet
                    return Math.round(Distance.convertMetersToFeet(this.value)) + Distance.Units.FEET;
                else
                    return Math.round(Distance.convertMetersToMiles(this.value) * 10)/10 + Distance.Units.MILES;
            }
        }
    }

    //value stored internally as meters
    //distance displayed based on google maps conventions
    //unitSystem 0 = METRIC, 1 = IMPERIAL
    constructor(distance = 0, unitSystem = Distance.UnitSystem.METRIC){
        if(typeof distance == 'number'){
            //assume meters
            this.unitSystem = unitSystem;
            this.value = distance;
        }
        else if(typeof distance == 'string'){
            //expected format '100 mi', '160.9 km', '500 ft', '90 m'
            return parseDistance(distance);
        }
    }

    //override toString
    toString(){
        return this.text;
    }
}

//--GEOMETRY FUNCTIONS START--//

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
export function getCoordinateAtDistance(distance, path){
    let meters = distance.value;
    let distance = 0;
    let prevDistance = 0;
    let i = 1;
    if (meters == 0) return path[0];
    if (meters < 0 || path.length < 2) return null;
    while (i < path.length && distance < meters){
        prevDistance = distance;
        distance += distanceFrom(path[i-1],path[i]);//from prevCoordinate to nextCoordinate
        i++;
    }
    if (distance < meters) return null; //the point extends beyond the path

    let prevCoordinate = path[i-2];
    let nextCoordinate = path[i-1];
    let metersFromPrevCoordinate = meters - prevDistance; 
    let bearing = getBearing(prevCoordinate, nextCoordinate);
    
    return getCoordinateFromBearingDistance(prevCoordinate, bearing, metersFromPrevCoordinate);
}

//--GEOMETRY FUNCTIONS END--//