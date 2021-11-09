
export const removeUrl = (urlToRemove) => {
        let fetchAddr = 'http://localhost:8000/removeUrl/' + urlToRemove
        return (dispatch) => {
            fetch(fetchAddr, {
                method: 'delete'})
            .then(response=>response.json(),
            error => console.log('An error occurred.', error)
            ).then(json =>
            dispatch({type:'GET_ALL_URLS', json}));
        }
    }