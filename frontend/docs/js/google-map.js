console.log("loading google-map.js...");
//--GOOGLE API CONSTANTS/FUNCTIONS/CLASSES--//

//center lat/lng USA
const DEFAULT_LATITUDE = 41.850033;
const DEFAULT_LONGITUDE = -87.6500523;
const DEFAULT_ZOOM = 10;
 
 const ICON_PATH = "https://maps.gstatic.com/consumer/images/icons/2x/"
 const ICON_SUFFIX = "_grey800_18dp.png";
function getManeuverIconURL(maneuver){
    return `${ICON_PATH}${maneuver.replace('-','_')}${ICON_SUFFIX}`;
}

class GoogleMap extends HTMLElement{
    constructor(){
        super();
        let mapOptions = {
            center: {
                lat: DEFAULT_LATITUDE,
                lng: DEFAULT_LONGITUDE
            },
            zoom: DEFAULT_ZOOM
        };
        this.map = new google.maps.Map(this,mapOptions);
        this.directionsService = new google.maps.DirectionsService();
        this.geocoder = new google.maps.Geocoder();
        //this.placesService = google.maps.places.PlacesService(map);
        let directionsRendererOptions = {
            map: this.map,
        };
        this.directionsRenderer = new google.maps.DirectionsRenderer(directionsRendererOptions);
        this.style.display = "block";
        this.style.flexBasis = "0";
        this.style.flexGrow = "4";
        this.style.minHeight = "100%";
        
        this.markers = [];
        this.polyline = null;

        this.places = null;
        this.directions = null;
        this.waypoints = null;

        
        this.bounds = new google.maps.LatLngBounds();
        
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
    addMarker(coordinate, options = {}){
        options.position = coordinate;
        let marker = new google.maps.Marker(options)
        this.markers.push(marker);
        this.map.fitBounds(this.bounds.extend(coordinate));
        marker.setMap(this.map);
    }

    addMarkers(coordinates, options = {}){
        for (let i = 0; i < coordinates.length; i++){
            this.addMarker(coordinates[i], options);
        }
    }

    //https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions
    addPolyline(path, options){
        options.path = path;
        let polyline = new google.maps.Polyline(options);
        polyline.setMap(this.map);
    }

    addPolygon(paths){
        console.log(paths);
        //options.paths = paths;
        let polygon = new google.maps.Polygon();
        polygon.setPaths(paths);
        //this.polygons.push(polygon);
        polygon.setMap(this.map);
    }

    addPolygons(paths){
        for (let i = 0; i < paths.length; i++){
            this.addPolygon(paths[i]);
        }
    }
    //Note about reverse geocoding using google maps
    //political entities vary from region to region even within the US
    //the geocoder will return all results for a particular coordinate
    //note the last result should always be the country
    //for the US the next to last should always be state level
    //therefore if you want the state level you would use results[results.length - 2];


    async reverseGeocode(coordinate){
        let {results, status} = await this.geocoder.geocode({location: coordinate});
        return results;
    }

    async reverseGeocodeAll(coordinates){
        console.log(coordinates);
        return Promise.all(coordinates.map(coordinate => this.reverseGeocode(coordinate)));
    }
}

customElements.define("google-map", GoogleMap);