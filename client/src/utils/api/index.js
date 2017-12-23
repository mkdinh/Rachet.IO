// Import client API
//--------------------------------------------------------
import user from "./user_api";
import post from "./post_api";
import room from "./room_api";
import poll from "./poll_api";
// Export APIs
//--------------------------------------------------------
export default {
    User: user,
    Post: post,
    Poll: poll,
    Room: room
};