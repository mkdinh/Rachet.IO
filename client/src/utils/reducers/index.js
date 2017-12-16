// Import reducers
//--------------------------------------------------------
import { combineReducers } from "redux";
import user from "./user_reducers";
import post from "./post_reducers";
import room from "./room_reducers";

// combine reducers together
//--------------------------------------------------------
const reducers = combineReducers({
    user: user,
    post: post,
    room: room
});

export default reducers;