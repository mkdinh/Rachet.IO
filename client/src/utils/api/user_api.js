// Import axios
//--------------------------------------------------------
import axios from "axios";

// Handle HTTP request
//--------------------------------------------------------
export default {
    login: (user) => axios.post("/api/users/login", user),
    
    logout: () => axios.get("api/users/logout")
}