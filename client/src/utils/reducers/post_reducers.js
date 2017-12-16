// init state
const initState = {
    posts: []
}

export default (state = initState, action) => {
    switch(action.type) {
        case "GET_POSTS_BY_ROOM":
            return { ...state, posts: action.payload.posts };
        default:
            return { ...state }
    };
};