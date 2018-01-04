// Import axios
//--------------------------------------------------------
import axios from "axios";

// handle client HTTP requests
//--------------------------------------------------------
export default {
    findAll: () => axios.get("/api/powerpoints/"),

    findOne: (id) => axios.get("/api/powerpoints/" + id),

    createOne: (powerpoint) => axios.post("/api/powerpoints/", powerpoint),

    updateOne: (update) => axios.put("/api/powerpoints/" + update._id, update),

    deleteOne: (id) => axios.delete("/api/powerpoints/" + id)
}