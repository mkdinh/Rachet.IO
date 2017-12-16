// Import axios
//--------------------------------------------------------
import axios from "axios";

// handle client HTTP requests
//--------------------------------------------------------
export default {
    createOne: (post) => axios.post("/api/posts/" + post.roomId, post)
}