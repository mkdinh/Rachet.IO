// Import axios
//--------------------------------------------------------
import axios from "axios";

// handle client HTTP requests
//--------------------------------------------------------
export default {
    findAll: () => axios.get("/api/rooms/"),

    findOne: (id) => axios.get("api/rooms/" + id),

    createOne: (room) => axios.post("/api/rooms/", room),

    deleteOne: (id) => axios.delete("api/rooms/" + id),
}