// set initstate
const initState = {
    list: [],
    cPoll: null,
    aPoll: null
}

export default (state = initState, action) => {
    switch(action.type) {
        case "GET_POLLS":
            return { ...state, list: action.payload.list };
        case "GET_POLL_INFO":
            return { ...state, cPoll: action.payload.cPoll };
        case "REMOVE_CPOLL":
            return { ...state, cPoll: null };           
        default:
            return { ...state };
    }
}