

//--GOOGLE API CONSTANTS/FUNCTIONS/CLASSES--//

//center lat/lng USA
const DEFAULT_LATITUDE = 41.850033;
const DEFAULT_LONGITUDE = -87.6500523;
const DEFAULT_ZOOM = 10;
const GOOGLE_MAPS_API_URL = "https://maps.googleapis.com/maps/api";
const GOOGLE_DIRECTIONS_PATH = "/directions";
const GOOGLE_PLACE_PATH = "/place/nearbysearch";
const API_OUTPUT_TYPE = "/json";
const GOOGLE_API_KEY = "AIzaSyDCMsOIEiqnQ16TDY85wGfVEjZ7fPu9buI";
 
 const ICON_PATH = "https://maps.gstatic.com/consumer/images/icons/2x/"
 const ICON_SUFFIX = "_grey800_18dp.png";

export function getManeuverIconURL(maneuver){
    return `${ICON_PATH}${maneuver.replace('-','_')}${ICON_SUFFIX}`;
}

export async function fetchDirections(origin,destination,units='imperial',waypoints=[]){
    let originURI = encodeURIComponent(origin);
    let destinationURI = encodeURIComponent(destination);
    //waypoints exceeding 10 are charged at a higher rate
    let waypointsParam = '';
    if (waypoints.length > 0) {
        let waypointsURI = encodeURIComponent(waypoints.map(
            `via:${waypoint.lat},${waypoint.lng}`).join('|'));
        waypointsParam = `&waypoints=${waypointsURI}`;
    }
    const response = await fetch(`${GOOGLE_MAPS_API_URL}${GOOGLE_DIRECTIONS_PATH}${API_OUTPUT_TYPE}
                                    ?key=${GOOGLE_API_KEY}&origin=${originURI}&destination=&${destinationURI}
                                        $units=${units}${waypointsParam}`);
    return await response.json();
}

//defaults to 'gas_station' searches, but leaving this open if we want to find other establishments
export async function fetchNearbyPlaces(coordinates,radiusInMeters=321867,type='gas_station'){
    let coordinatesURI = encodeURIComponent(`${coordinates.lat},${coordinates.lng}`);
    const response = await fetch(`${GOOGLE_MAPS_API_URL}${GOOGLE_PLACE_PATH}${API_OUTPUT_TYPE}
                                    ?key=${GOOGLE_API_KEY}&location=${coordinatesURI}
                                        &radius=${radiusInMeters}&type=${type}`);
    return await response.json();
}

export class GoogleMap extends HTMLElement{
    constructor(){
        super();

        this.style.display = "block";
        this.style.flexBasis = "0";
        this.style.flexGrow = "4";
        this.style.minHeight = "100%";
        
        this.markers = [];
        this.polyline = null;

        this.places = null;
        this.directions = null;
        this.waypoints = null;
    }

    //call when Google Maps API is loaded
    init(){
        let options = {
            center: {
                lat: DEFAULT_LATITUDE,
                lng: DEFAULT_LONGITUDE
            },
            zoom: DEFAULT_ZOOM
        };
        this.bounds = new google.maps.LatLngBounds();
        this.map = new google.maps.Map(this,options);
    }

    clear(){
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }

        this.polyline.setMap(null);
        this.markers = [];
    }

    render(){
        this.clear();
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(this.map);
        }
        this.polyline.setMap(this.map);
    }

    //https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
    addMarker(coordinates, options){
        let marker = new google.maps.Markers(options)
        this.markers.push(marker);
        this.map.fitBounds(this.bounds.extends(coordinates));
        marker.setPosition(coordinates);
    }

    //https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions
    addPolyline(path, options){
        //will already be in bounds by markers
        let polyline = new google.maps.Polyline(options);
    }
}

customElements.define("google-map", GoogleMap);