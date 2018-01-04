// Import API
//--------------------------------------------------------
import API from "../api";

// Handle dispatch request
//--------------------------------------------------------
export default {
    findAll: () => {
        return (
            dispatch => API.PowerPoint.findAll()
            .then(db => dispatch({
                type: "GET_POWERPOINTS",
                payload: { list: db.data }
            }))
            .catch(err => console.log(err))
        )
    },

    createOne: (room) => {
        return (
            dispatch => API.PowerPoint.createOne(room)
            .then(db => dispatch({
                type: "GET_POWERPOINTS",
                payload: { list: db.data }
            }))
            .catch(err => console.log(err))
        )
    },

    deleteOne: (id) => {
        return (
            dispatch => API.PowerPoint.deleteOne(id)
            .then(db => dispatch({
                type: "GET_POWERPOINTS",
                payload: { list: db.data }
            }))
            .catch(err => console.log(err))
        )
    },
};