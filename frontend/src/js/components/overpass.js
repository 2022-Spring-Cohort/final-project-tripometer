import {asyncRequest} from "../allRequest.js";
//fetch polyline boundaries of county from coordinate.
const OVERPASSAPI = "https://overpass-api.de/api/interpreter";
const DATA_KEY = "data";
const DATA_FORMAT = "[out:json];";

export async function getCountyGeometry(isInStatements){
    let dataComponent = encodeURIComponent(`${DATA_FORMAT}(${isInStatements})->.a;rel(pivot.a)[boundary=administrative][admin_level=6];out geom;`);
    let body = `${DATA_KEY}=${dataComponent}`;
    let headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    };
    let data = await asyncRequest(OVERPASSAPI,"POST",body,headers);
    return data;
}