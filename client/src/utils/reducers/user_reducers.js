// create intital state
//--------------------------------------------------------
const initState = {
    login: false,
    name: "",
    privilege: 0,
    adminView: false
}

export default (state = initState, action) => {
    switch(action.type){
        case "SELECT_NAME": 
            return  { ...state, name: action.payload.name };
        case "LOGIN":
            return { ...state, login: true, name: action.payload.name, privilege: action.payload.privilege };
        case "LOGOUT":
            return { ...initState };
        case "TOGGLE_VIEW":
            return { ...state, adminView: !state.adminView };
        default:
            return { ...state };
    }
} 