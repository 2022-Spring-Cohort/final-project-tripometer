const FUEL_LEFT_ON_EMPTY = 2; //below average in gallons
const LITERS_PER_GALLON = 3.78541;
const METERS_PER_MILE = 1609.34;

export class Vehicle{
    constructor(ownerId=1, fuelEfficiency=30, fuelTankSize = 12, initialGaugeReading = 1){
        this.ownerId = ownerId;
        this.fuelEfficiency = fuelEfficiency;
        this.fuelTankSize = fuelTankSize;
        this.gaugeReading = initialGaugeReading;
    }

    get fuelTankSizeInLiters(){
        return this.fuelTankSize * LITERS_PER_GALLON;
    }

    get fuel(){
        return this.fuelTankSize * this.gaugeReading;
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
        return this.FuelTankSize * this.fuelEfficiency;
    }

    get maxDistanceOnFullInMeters(){
        return this.FuelTankSize * this.fuelEfficiency * METERS_PER_MILE;
    }

    get maxDistanceOnEmpty(){
        return FUEL_LEFT_ON_EMPTY * this.fuelEfficiency;
    }

    get maxDistanceOnEmptyInMeters(){
        return this.maxDistanceOnEmpty * METERS_PER_MILE;
    }

    getRefuelDistances(totalDistanceInMeters){
        console.log(totalDistanceInMeters);
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
        console.log(refuelDistances);
        return refuelDistances;
    }
}