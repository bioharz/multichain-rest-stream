function toHex(str) {
    var hex = '';
    for (var i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
}

function fromHex(hexx) {
    if(hexx==null) return null;
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function AsyncArray(dt) {
    this.data = dt;
    this.filterAsync = function(predicate) {
        // Take a copy of the array, it might mutate by the time we've finished
        const dat = Array.from(this.data);
        // Transform all the elements into an array of promises using the predicate
        // as the promise
        return Promise.all(dat.map((element, index) => predicate(element, index, dat)))
        // Use the result of the promises to call the underlying sync filter function
            .then(result => {
                return dat.filter((element, index) => {
                    return result[index];
                });
            });
    }
    this.mapAsync = function (predicate) {
        // Take a copy of the array, it might mutate by the time we've finished
        const dat = Array.from(this.data);
        // Transform all the elements into an array of promises using the predicate
        // as the promise
        return Promise.all(dat.map((element, index) => predicate(element, index, dat)))
        // Use the result of the promises to call the underlying sync filter function
            .then(result => {
                return dat.map((element, index) => {
                    return result[index];
                });
            });
    }
}