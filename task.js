const dataIn = {
    'a.b.c.m': 'm data',
    'a.b.x': 'x data',
    'd.e': 'e data',
    'd.d': 'd data',
    'testKey': 'test key data',
};

const dataOut = {
    'a': {
        'b': {
            'c': {
                'm': 'm data',
            },
            'x': 'x data',
        }
    },
    'd': {
        'e': 'e data',
        'd': 'd data',
    },
    'testKey': 'test key data',
};

const recursion = (arr, value) => {
    const cur = {};
    if (arr.length === 1) {
        return {[arr[0]]: value}
    } else {
        cur[arr[0]] = recursion(arr.slice(1), value)
    }
    return cur
};

const merge = (obj, key, el) => {
    if (!obj[key]) {
        obj[key] = el[key];
    } else {
        const nestedKey = Object.keys(el[key])[0];
        return merge(obj[key], nestedKey, el[key])
    }
    return obj
};

const f = (data) => {
    let result = {};
    const keys = Object.keys(data);
    const nested = keys.map((el, ind) => {
        const arr = el.split('.');
        return recursion(arr, data[keys[ind]])
    });
    nested.forEach(el => {
        const key = Object.keys(el)[0];
        merge(result, key, el)
    });
    return result
};

console.log(f(dataIn));


// Should display "true"
console.log(JSON.stringify(f(dataIn)) === JSON.stringify(dataOut));
