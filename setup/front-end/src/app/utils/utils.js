export function parseUrl() {
    const url = window.location;
    let query = url.href.split('?')[1] || '';
    let delimiter = '&';
    let result = [];
    let parts = query
        .split(delimiter);
        
    result = parts.map(kv => kv.split('='))
        .reduce((acc, kv) => {
            acc[kv[0]] = kv[1];
            return acc;
        }, {})

    return result;

}
