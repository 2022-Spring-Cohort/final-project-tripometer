export default{
    isEmpty,
    Capitalize
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