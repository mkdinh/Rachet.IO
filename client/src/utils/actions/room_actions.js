// Import API
//--------------------------------------------------------
import API from "../api";

// Handle dispatch request
//--------------------------------------------------------
export default {
    findAll: () => {
        return (
            dispatch => API.Room.findAll()
            .then(db => dispatch({
                type: "GET_ROOMS",
                payload: { list: db.data }
            }))
            .catch(err => console.log(err))
        )
    },

    returnToLobby: () => {
        return (
            dispatch => new Promise((resolve, reject) => {
                dispatch({ type: "RETURN_TO_LOBBY" })
                resolve();
            })
        )
    },

    findOne: (id) => {
        return (
            dispatch => API.Room.findOne(id)
            .then(db => dispatch({
                type: "GET_ROOM_INFO",
                payload: { cRoom: db.data }
            }))
            .catch(err => console.log(err))
        )
    },

    createOne: (room) => {
        return (
            dispatch => API.Room.createOne(room)
            .then(db => dispatch({
                type: "GET_ROOMS",
                payload: { list: db.data }
            })
            .catch(err => console.log(err)))
        )
    },

    deleteOne: (id) => {
        return (
            dispatch => API.Room.deleteOne(id)
            .then(db => dispatch({
                type: "GET_ROOMS",
                payload: { list: db.data }
            }))
            .catch(err => console.log(err))
        )
    },
};