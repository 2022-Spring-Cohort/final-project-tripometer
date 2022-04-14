import { VehicleController } from "../constants";
import { asyncRequest } from "../allRequest";

const FUEL_LEFT_ON_EMPTY = 2; //below average in gallons
const LITERS_PER_GALLON = 3.78541;
const METERS_PER_MILE = 1609.34;

//returns vehicle
export async function getVehicle(vehicleId, initialGaugeReading = 1, target=null){
    let vehicleModel = await asyncRequest(`${VehicleController}${vehicleId}`);
    return new Vehicle(vehicleModel.ownerId, vehicleModel.id, vehicleModel.fuelEfficiency, vehicleModel.fuelTank, initialGaugeReading, target);
}

export class Vehicle{
    #gaugeReading = 0.0;
    constructor(ownerId=1, vehicleId=1, fuelEfficiency=30, fuelCapacity = 12, initialGaugeReading = 1, target = null){
        this.ownerId = ownerId;
        this.vehicleId = vehicleId;
        this.fuelEfficiency = fuelEfficiency;
        this.fuelCapacity = fuelCapacity;
        this.#gaugeReading = initialGaugeReading;
        this.target = target;
        this.render();
        //console.log(this);
    }

    render(){
        //console.log("Vehicle trying to render to: " + this.target);
        if (this.target){
            this.target.innerHTML = `
            <div class="result-item">
                <h3>Fuel Efficiency: <strong id="fuel-efficiency">${this.fuelEfficiency} m.p.g.</strong></h3>
                <h3>Fuel Capacity: <strong id="fuel-capacity">${this.fuelCapacity.toFixed(2)} gal.</strong></h3>
                <h3>Current Fuel: <strong id="current-fuel">${this.fuel.toFixed(2)} gal.</strong></h3>
                <h3>Max Distance: <strong id="max-distance">${this.maxDistance.toFixed(2)} mi.</strong></h3>
            </div>
            `;
        }
    }

    get gaugeReading(){
        return this.#gaugeReading;
    }

    set gaugeReading(val){
        this.#gaugeReading = val;
        this.render();        
    }
    get fuelTankSizeInLiters(){
        return this.fuelCapacity * LITERS_PER_GALLON;
    }

    get fuel(){
        //console.log('get fuel', this.fuelCapacity,this.gaugeReading,this.fuelCapacity*this.#gaugeReading);
        return this.fuelCapacity * this.#gaugeReading;
    }

    get fuelInLiters(){
        return this. fuel * LITERS_PER_GALLON;
    }

    get maxDistance(){  //max distance that can be traveled
        return this.fuel * this.fuelEfficiency; //initial maxDistance would be 145.2 miles
    }

    get maxDistanceInMeters(){
        return this.maxDistance * METERS_PER_MILE;
    }
    get maxDistanceOnFull(){
        return this.fuelCapacity * this.fuelEfficiency;
    }

    get maxDistanceOnFullInMeters(){
        return this.fuelCapacity * this.fuelEfficiency * METERS_PER_MILE;
    }

    get maxDistanceOnEmpty(){
        return FUEL_LEFT_ON_EMPTY * this.fuelEfficiency;
    }

    get maxDistanceOnEmptyInMeters(){
        return this.maxDistanceOnEmpty * METERS_PER_MILE;
    }

    getRefuelDistances(totalDistanceInMeters){
        //console.log(totalDistanceInMeters);
        let refuelDistances = [];
        let remainingDistance = totalDistanceInMeters;
        let distance = this.maxDistanceInMeters; //initial distance we can travel
        while(distance < remainingDistance) {
            remainingDistance -= distance; //our remaining distance
            refuelDistances.push({distance: distance, fuel: this.fuel});
            this.gaugeReading = 1;
            distance = this.maxDistanceInMeters;
        } ;
        //final distance calculation
        //we either are at our destination or don't need a full tank
        if (remainingDistance != 0){ //if we're not at our destination
            this.gaugeReading = remainingDistance/distance;
            refuelDistances.push({distance:remainingDistance, fuel: this.fuel});
        }
        this.gaugeReading = 0; //for return trip calculations
        //console.log(refuelDistances);
        return refuelDistances;
    }

    //for hack so gauge doesn't get stuck at 0 on return trip
    refuel(){
        this.#gaugeReading = 1;
    }
}