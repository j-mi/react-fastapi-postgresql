const initialState = {
    urlID: null,
    urlShort:'',
    urlShortAddress:'',
    hostAddress:'',
    urlLong:'',
    stats:[]
}

const dataReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_URL_DATA':
            return { urlShortAddress:action.json['urlShortAddress'], urlLong:action.json['longUrl'] }
        case 'GET_ALL_URLS':
            return { hostAddress:action.json['hostAddress'], stats: action.json['urlsToReturn'] }
        case 'REMOVE_URL':
            return { ...state }
        default:
        return state;
        
    }
}

export default dataReducer;