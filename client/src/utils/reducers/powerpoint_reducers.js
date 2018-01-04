// Set init state
//--------------------------------------------------------
const initState = {
    list: []
};

export default (state = initState, action) => {
    switch(action.type) {
        case "GET_POWERPOINTS":
            return { ...state, list: action.payload.list };
        default : 
            return { ...state };
    }
};