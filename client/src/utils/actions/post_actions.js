// import API 
//--------------------------------------------------------
import API from "../api";

export default {
    createOne: (post) => {
        return (
            dispatch => API.Post.createOne(post)
                .then(db => dispatch({
                    type: "GET_POSTS_BY_ROOM",
                    payload: {posts: db.data, room: post.room}
                }))
                .catch(err => console.log(err))
        )
    }
                        
}