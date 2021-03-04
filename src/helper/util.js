// TODO : Object to QueryString.
export const objectToQueryString = (obj) => {
    let str = '?' + Object.keys(obj).reduce(function (a, k) {
        encodeURIComponent(obj[k]) && a.push(k + '=' + encodeURIComponent(obj[k]));
        return a;
    }, []).join('&');
    return str;
}

// TODO : Get Params from Routes URL.
export const getParamsFromUrl = (pathname, isEmptyResponseObject = true) => {
    let indexedUrl = pathname ? pathname.split('/') : [];
    let year = indexedUrl && indexedUrl.indexOf('year') > -1 ? indexedUrl[(indexedUrl.indexOf('year') + 1)] : '';
    let isLaunch = indexedUrl && indexedUrl.indexOf('isLaunch') > -1 ? indexedUrl[(indexedUrl.indexOf('isLaunch') + 1)] : '';
    let isLanding = indexedUrl && indexedUrl.indexOf('isLanding') > -1 ? indexedUrl[(indexedUrl.indexOf('isLanding') + 1)] : '';
    const isParamsAvailable = year || isLaunch || isLanding;
    if (isParamsAvailable) return {
        year,
        isLaunch,
        isLanding
    }
    else return {};

}

// TODO : Prepare object for api params.
export const setFilterKeys = (filter) => {
    let params = {};
    params['launch_year'] = filter['year'];
    params['launch_success'] = filter['isLaunch'];
    params['land_success'] = filter['isLanding'];
    return params;
}

// TODO : Common Util for capital first later. 
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO : Get value for land success
export const getLandSuccess = (item) => {
    if (item) {
        return item.rocket.first_stage.cores[0].land_success;
    }
    return '';
}