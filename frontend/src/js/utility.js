import { METERS_PER_MILE } from "./constants";

export default{
    isEmpty,
    Capitalize,
    populateSelect,
    metersToMiles,
    secondsToDhms
}

function isEmpty(str){
    return (!str || str.length === 0);
}

//Only consider the string being more than 1 character long
function Capitalize(str){
    let firstChar = str.charAt(0).toUpperCase();
    let end = str.substr(1).toLowerCase();
    return firstChar + end;

    
}

/**
 * Represents the property accessor of another object.
 * @typedef ReferenceObjectProperty
 * @type {string}
*/

/**
 * Represents the attribute name of an HTMLElement.
 * @typedef AttributeName
 * @type {string}
*/

/**
 * Represents the property accessor an HTMLElement.
 * @typedef PropertyName
 * @type {string}
*/

/**
 * Represents a dictionary of attribute and property references from an HTMLELement to the properties of another Object.
 * @typedef {attributes: Object.<AttributeName,ReferenceObjectProperty>, properties: Object.<PropertyName,ReferenceObjectProperty>} ReferenceOptions
 */

/**
 * Populates a provided HTMLSelectElement(selectElement) with HTMLOptionElement whose properties and attributes are referenced from the optionItems object via a ReferenceOptions object.
 * 
 * @param {HTMLSelectElement} selectElement 
 * @param {Array<Object>} optionItems
 * @param {ReferenceOptions} referenceOptions - an object that defines the attributes and properties of the options object
 */
function populateSelect(selectElement, optionItems, optionsObject){
    optionItems.forEach((optionItem)=>{
        let option = document.createElement('option');
        selectElement.appendChild(option);
        //assign attributes
        for (let [attributeName, referenceObjectProperty] of Object.entries(optionsObject.attributes)){
            option.setAttribute(attributeName, optionItem[referenceObjectProperty]);
        }
        //assign properties
        for (let [propertyName, referenceObjectProperty] of Object.entries(optionsObject.properties)){
            option[propertyName] = optionItem[referenceObjectProperty];
        }
    });
}

function metersToMiles(meters){
    return meters / METERS_PER_MILE;
}

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}