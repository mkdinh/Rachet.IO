// set initial state
//--------------------------------------------------------
const initState = {
    list: [],
    cRoom: {}
};

export default (state = initState, action) => {
    switch(action.type) {
        case "GET_ROOMS":
            return { ...state, list: action.payload.list };
        case "GET_ROOM_INFO":
            return { ...state, cRoom: action.payload.cRoom };
        case "RETURN_TO_LOBBY":
            return { ...state, cRoom: false };
        default:
            return { ...state };

    }
}