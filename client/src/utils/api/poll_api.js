// Import axios
//--------------------------------------------------------
import axios from "axios";

// Handle client HTTP requests
//--------------------------------------------------------
export default {
    findAll: () => axios.get("/api/polls/"),

    findOne: (id) => axios.get("/api/polls/" + id),

    findActive: () => axios.get("/api/polls/active"),
    
    createOne: (poll) => axios.post("api/polls/", poll),

    updateOne: (update) => axios.put("/api/polls/" + update._id, update),

    deleteOne: (id) => axios.delete("api/polls/" + id)
}