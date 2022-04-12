export function getStepsAtDistances(steps,distances){
    console.log(steps,distances);
    if (distances.length < 1) return [];
    let totalDistance = 0; //accumulators
    let prevDistance = 0;
    let totalDuration = 0;
    let prevDuration = 0;
    let stepsAtDistances = [];
    let prevStep = null;
    let j = 0;

    for (let i = 0; i < distances.length; i++) {
            while (j < steps.length && totalDistance < distances[i]){
            prevStep = steps[j];
            prevDistance = totalDistance;
            prevDuration = totalDuration;
            totalDistance += steps[j].distance.value;
            totalDuration += steps[j].duration.value;
            j++;
        }
        let distanceRemaining = distances[i] - prevDistance; //the distance needed to travel along the path of the prev step
        let intervalRatio = distances[i]/distanceRemaining; //used to calculate (very) rough ETA
        let eta = prevDuration * intervalRatio;
        stepsAtDistances.push({stepIndex: j-1, distanceRemaining: distanceRemaining, eta: eta});
        totalDistance = 0;
        prevDistance = 0;
        totalDuration = 0;
        prevDuration = 0;
    }
    console.log(stepsAtDistances);
    return stepsAtDistances;
}