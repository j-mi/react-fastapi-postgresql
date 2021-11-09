export const getShortUrl = (longUrl) => {
    let fetchAddr = 'http://localhost:8000/snipUrl'
    return (dispatch) => {
        fetch(fetchAddr, {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
                body: JSON.stringify(longUrl)})
        .then(response=>response.json(),
        error => console.log('An error occurred.', error)
        ).then(json =>
        dispatch({type:'GET_URL_DATA', json}));
    }
}

export const getAllUrls = () => {
    let fetchAddr = 'http://localhost:8000/stats/all'
    return (dispatch) => {
        fetch(fetchAddr, {
            method: 'get'})
        .then(response=>response.json(),
        error => console.log('An error occurred.', error)
        ).then(json =>
        dispatch({type:'GET_ALL_URLS', json}));
    }
}
