export default {
    allRequest,
    
}

function allRequest(location, callback, method = "GET", body=null){
    let fetchOptions = {
        method : method,
    }

    if (method == "PUT" || method == "POST" || body != null){
        fetchOptions["body"] = JSON.stringify(body);
        fetchOptions["headers"] = {
            "Content-Type": "application/json"
        }
    }

    fetch(location, fetchOptions)
    .then(response => response.json())
    .then(data => {
        callback(data);
    })
    .catch(err => console.error(err));
}

