

//stateCode EXAMPLE: OH,AZ
export function GetGasPrice(stateCode, callback){
    let url = 'https://api.collectapi.com/gasPrice/stateUsaPrice?state='+ stateCode;
    fetch(url, {
    headers: {
        'authorization': 'apikey 06Weo8AHt0bLRH5jK1Wb8Y:0hyQl71llTheHm8IbcRBgO',
        'content-type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        callback(data);
    })
    .catch(err => console.log(err))
}