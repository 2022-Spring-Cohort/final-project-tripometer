//CONSTANTS

//center lat/lng USA
const DEFAULT_LATITUDE = 37.09;
const DEFAULT_LONGITUDE = 95.71;
const DEFAULT_ZOOM = 10;

//END CONSTANTS

class GoogleMap extends HTMLElement{
    constructor(){
        console.log('Constructing custom element...');
        super();
        this.style.display = "block";
        this.style.flexBasis = "0";
        this.style.flexGrow = "4";
        this.style.minHeight = "100%";
        this.markers = [];
        
    }

    clearMarkers(){
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    
        this.markers = [];
    }

    addMarker(address, isDestination){
        this.geocoder.geocode({address: address})
            .then(({results}) => {
                console.log(results);
                let location = results[0].geometry.location;
                this.map.fitBounds(this.bounds.extend(location));
                let markerOptions = {
                    map: this.map,
                    position: location,
                    label: isDestination ? "D" : "O"
                };

                this.markers.push(
                    new google.maps.Marker(markerOptions)
                );
            });            
    }

    async createTrip(request){
        let response = await this.distanceMatrixService.getDistanceMatrix(request);
        console.log(response);
        this.trip = response;
        let origin = response.originAddresses[0];
        let destination = response.destinationAddresses[0];
        this.clearMarkers();
        this.addMarker(origin, false);
        this.addMarker(destination, true);
        //TODO: store trip data...
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
        console.log(options);
        this.distanceMatrixService = new google.maps.DistanceMatrixService();
        this.geocoder = new google.maps.Geocoder();
        this.bounds = new google.maps.LatLngBounds();
        this.map = new google.maps.Map(this,options);

        this.trip = null;
        console.log('finished api calls...');
    }
}

customElements.define("google-map", GoogleMap);