
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



//Returned json
// {
//     "success": true,
//     "result": {
//         "state": {
//             "currency": "usd",
//             "name": "Ohio",
//             "lowerName": "ohio",
//             "gasoline": "3.890",
//             "midGrade": "4.256",
//             "premium": "4.584",
//             "diesel": "4.964"
//         },
//         "cities": [
//             {
//                 "currency": "usd",
//                 "gasoline": "3.950",
//                 "midGrade": "4.338",
//                 "premium": "4.638",
//                 "diesel": "5.012",
//                 "name": "Akron",
//                 "lowerName": "akron"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.835",
//                 "midGrade": "4.234",
//                 "premium": "4.588",
//                 "diesel": "4.991",
//                 "name": "Belmont County",
//                 "lowerName": "belmont county"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.885",
//                 "midGrade": "4.249",
//                 "premium": "4.570",
//                 "diesel": "4.982",
//                 "name": "Canton-Massillon",
//                 "lowerName": "canton-massillon"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.899",
//                 "midGrade": "4.244",
//                 "premium": "4.586",
//                 "diesel": "4.932",
//                 "name": "Cincinnati (OH only)",
//                 "lowerName": "cincinnati (oh only)"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.983",
//                 "midGrade": "4.389",
//                 "premium": "4.718",
//                 "diesel": "5.040",
//                 "name": "Cleveland-Lorain-Elyria",
//                 "lowerName": "cleveland-lorain-elyria"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.822",
//                 "midGrade": "4.170",
//                 "premium": "4.498",
//                 "diesel": "4.922",
//                 "name": "Columbus",
//                 "lowerName": "columbus"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.733",
//                 "midGrade": "4.121",
//                 "premium": "4.459",
//                 "diesel": "4.929",
//                 "name": "Dayton",
//                 "lowerName": "dayton"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.965",
//                 "midGrade": "4.256",
//                 "premium": "4.532",
//                 "diesel": "4.920",
//                 "name": "Lawerence County",
//                 "lowerName": "lawerence county"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.823",
//                 "midGrade": "4.283",
//                 "premium": "4.599",
//                 "diesel": "4.966",
//                 "name": "Lima",
//                 "lowerName": "lima"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.886",
//                 "midGrade": "4.231",
//                 "premium": "4.564",
//                 "diesel": "4.927",
//                 "name": "Mansfield",
//                 "lowerName": "mansfield"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.775",
//                 "midGrade": "4.144",
//                 "premium": "4.465",
//                 "diesel": "4.978",
//                 "name": "Springfield",
//                 "lowerName": "springfield"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.845",
//                 "midGrade": "4.223",
//                 "premium": "4.500",
//                 "diesel": "4.971",
//                 "name": "Steubenville-Weirton (OH only)",
//                 "lowerName": "steubenville-weirton (oh only)"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.936",
//                 "midGrade": "4.309",
//                 "premium": "4.610",
//                 "diesel": "5.044",
//                 "name": "Toledo",
//                 "lowerName": "toledo"
//             },
//             {
//                 "currency": "usd",
//                 "gasoline": "3.941",
//                 "midGrade": "4.325",
//                 "premium": "4.677",
//                 "diesel": "5.034",
//                 "name": "Youngstown-Warren",
//                 "lowerName": "youngstown-warren"
//             }
//         ]
//     }
// }